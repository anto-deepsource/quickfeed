package kube_test

import (
	"context"
	"flag"
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"sync"
	"testing"
	"time"

	"github.com/autograde/aguis/ci/kube"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
)

var (
	home   = homeDir()
	config = &kube.KubeConf{
		ConfigFlag: flag.String("kubeconfig", filepath.Join(home, ".kube", "config"), "(optional) absolute path to the kubeconfig file"),
	}
	m sync.Mutex
)

func init() { //TODO kube clinet
}

func newKubeCI() *kube.K8s {
	return &kube.K8s{}
}

func newTest(script, wantOut string) *test {
	t := &test{}
	t.script = script
	t.wantOut = wantOut
	return t
}

type test struct {
	script, wantOut, out string
}

func TestK8sZero(t *testing.T) {
	const (
		script  = `echo -n "hello world 0"`
		wantOut = "hello world 0"
	)

	container := &kube.PodContainer{
		BaseImage:    "golang",
		ContainerCmd: []string{script},
	}

	k := newKubeCI()
	out, err := k.RunKubeJob(context.Background(), container, "agcicd", time.Now().Format("20060102-150405-99999999"), config.ConfigFlag)
	if err != nil {
		t.Fatal(err)
	}

	if out != wantOut {
		t.Errorf("have %#v want %#v", out, wantOut)
	}
}

func TestOneA(t *testing.T) {

	numberOfPods := 10
	tests := make([]test, numberOfPods)

	for i := 0; i < numberOfPods; i++ {
		t := newTest(`echo -n "`+strconv.Itoa(i)+`"`, strconv.Itoa(i))
		tests[i] = *t
	}

	fmt.Println(tests)

	for i := 0; i < numberOfPods; i++ {
		tm := "ci" + strconv.Itoa(i)
		//tm := "ci-" + getTimeNow() + "-" + strconv.Itoa(i)

		k := newKubeCI()

		fmt.Println(tests[i])
		//err := newError()
		s := tests[i].script
		out, _ := k.RunKubeJob(context.Background(),
			&kube.PodContainer{
				BaseImage:    "golang",
				ContainerCmd: []string{s},
			},
			"agcicd", tm, config.ConfigFlag)

		tests[i].out = out
		fmt.Println("Input value: ", s)
	}

	for i := 0; i < numberOfPods; i++ {
		tst := tests[i]
		if tst.out != tst.wantOut {
			t.Errorf("have %#v want %#v", tst.out, tst.wantOut)
		}
	}
}

func getTimeNow() string {
	return time.Now().Format("20060102-150405")
}

func setupEnv(t *testing.T, jobId string) (*kubernetes.Clientset, *kube.K8s) {
	const (
		script  = `echo -n "hello world"`
		wantOut = "hello world"
	)

	container := &kube.PodContainer{
		BaseImage:    "golang",
		ContainerCmd: []string{script},
	}

	k := newKubeCI()
	out, err := k.RunKubeJob(context.Background(), container, "agcicd", jobId, config.ConfigFlag)
	if err != nil {
		t.Fatal(err)
		fmt.Println(out)
	}

	config, err := clientcmd.BuildConfigFromFlags("", *config.ConfigFlag)
	if err != nil {
		t.Errorf(err.Error())
		return nil, nil
	}
	//K8s clinet
	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		t.Errorf(err.Error())
		return nil, nil
	}
	return clientset, k
}

func homeDir() string {
	if h := os.Getenv("HOME"); h != "" {
		return h
	}
	return os.Getenv("USERPROFILE") // windows
}
