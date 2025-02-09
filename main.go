package main

import (
	"flag"
	"fmt"
	"log"
	"mime"
	"net"
	"net/http"
	"os"

	"github.com/quickfeed/quickfeed/ci"
	"github.com/quickfeed/quickfeed/qf"
	"github.com/quickfeed/quickfeed/qlog"
	"github.com/quickfeed/quickfeed/web"
	"github.com/quickfeed/quickfeed/web/auth"

	"github.com/quickfeed/quickfeed/database"

	"google.golang.org/grpc"

	grpc_prometheus "github.com/grpc-ecosystem/go-grpc-prometheus"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

func init() {
	// Create some standard server metrics.
	grpcMetrics := grpc_prometheus.NewServerMetrics()

	mustAddExtensionType := func(ext, typ string) {
		if err := mime.AddExtensionType(ext, typ); err != nil {
			panic(err)
		}
	}

	// On Windows, mime types are read from the registry, which often has
	// outdated content qf. This enforces that the correct mime types
	// are used on all platforms.
	mustAddExtensionType(".html", "text/html")
	mustAddExtensionType(".css", "text/css")
	mustAddExtensionType(".js", "application/javascript")
	mustAddExtensionType(".jsx", "application/javascript")
	mustAddExtensionType(".map", "application/json")
	mustAddExtensionType(".ts", "application/x-typescript")

	reg.MustRegister(
		grpcMetrics,
		qf.AgFailedMethodsMetric,
		qf.AgMethodSuccessRateMetric,
		qf.AgResponseTimeByMethodsMetric,
	)
}

// Create a metrics registry.
var reg = prometheus.NewRegistry()

func main() {
	var (
		baseURL  = flag.String("service.url", "", "base service DNS name")
		dbFile   = flag.String("database.file", "qf.db", "database file")
		public   = flag.String("http.public", "public", "path to content to serve")
		httpAddr = flag.String("http.addr", ":8081", "HTTP listen address")
		grpcAddr = flag.String("grpc.addr", ":9090", "gRPC listen address")
	)
	flag.Parse()

	logger, err := qlog.Zap()
	if err != nil {
		log.Fatalf("can't initialize logger: %v", err)
	}
	defer logger.Sync()

	db, err := database.NewGormDB(*dbFile, logger)
	if err != nil {
		log.Fatalf("can't connect to database: %v\n", err)
	}

	// holds references for activated providers for current user token
	scms := auth.NewScms()
	bh := web.BaseHookOptions{
		BaseURL: *baseURL,
		Secret:  os.Getenv("WEBHOOK_SECRET"),
	}

	runner, err := ci.NewDockerCI(logger.Sugar())
	if err != nil {
		log.Fatalf("failed to set up docker client: %v\n", err)
	}
	defer runner.Close()

	// Add application token for external applications (to allow invoking gRPC methods)
	// TODO(meling): this is a temporary solution, and we should find a better way to do this
	token := os.Getenv("QUICKFEED_AUTH_TOKEN")
	if len(token) > 16 {
		auth.Add(token, 1)
		log.Println("Added application token")
	}

	qfService := web.NewQuickFeedService(logger, db, scms, bh, runner)
	go web.New(qfService, *public, *httpAddr)

	lis, err := net.Listen("tcp", *grpcAddr)
	if err != nil {
		log.Fatalf("failed to start tcp listener: %v\n", err)
	}
	opt := grpc.ChainUnaryInterceptor(auth.UserVerifier(), qf.Interceptor(logger))
	grpcServer := grpc.NewServer(opt)
	// Create a HTTP server for prometheus.
	httpServer := &http.Server{
		Handler: promhttp.HandlerFor(reg, promhttp.HandlerOpts{}),
		Addr:    fmt.Sprintf("0.0.0.0:%d", 9097),
	}
	go func() {
		if err := httpServer.ListenAndServe(); err != nil {
			log.Fatal("Unable to start a http server.")
		}
	}()

	qf.RegisterQuickFeedServiceServer(grpcServer, qfService)
	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("failed to start grpc server: %v\n", err)
	}
}
