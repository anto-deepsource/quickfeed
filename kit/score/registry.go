package score

import (
	"fmt"
	"path/filepath"
	"reflect"
	"runtime"
	"sort"
	"strings"
	"testing"
)

// registry keeps a map of score objects and a slice of test names,
// in registration order, which is used to preserve deterministic iteration order.
type registry struct {
	testNames []string          // testNames in registration order
	scores    map[string]*Score // map from TestName to score object
}

func NewRegistry() *registry {
	return &registry{
		testNames: make([]string, 0),
		scores:    make(map[string]*Score),
	}
}

// Validate returns an error if one of the recorded score objects are invalid.
// Otherwise, nil is returned.
func (s *registry) Validate() error {
	callFrame()
	for _, sc := range s.scores {
		if err := sc.IsValid(sessionSecret); err != nil {
			return err
		}
	}
	return nil
}

// PrintTestInfo prints a JSON representation of all registered tests
// in the order they were registered, or if sorted is true the test names
// will be sorted before printing.
//
// This should be called after test registration has been completed,
// but before test execution. This can be done in TestMain.
//
// Will panic if called from a non-test function.
func (s *registry) PrintTestInfo(sorted ...bool) {
	callFrame()
	if len(sorted) == 1 && sorted[0] {
		sort.Strings(s.testNames)
	}
	// iterate over the test names in registration or sorted order
	for _, name := range s.testNames {
		if sc, ok := s.scores[name]; ok {
			fmt.Println(sc.json())
		}
	}
}

// Add test with given max score and weight to the registry.
//
// Will panic if the test has already been registered or if max or weight is non-positive.
func (s *registry) Add(test interface{}, max, weight int) {
	s.add(testName(test), "", max, weight)
}

// AddWithTask test with given taskName, max score and weight to the registry.
// This function is identical to Add, with the addition of assigning a task name.
//
// Will panic if the test has already been registered or if max or weight is non-positive.
func (s *registry) AddWithTask(test interface{}, taskName string, max, weight int) {
	s.add(testName(test), taskName, max, weight)
}

// AddSub test with given max score and weight to the registry.
// This function should be used to register subtests, and should be used in
// conjunction with MaxByName and MinByName called from within a subtest.
//
// Will panic if the test has already been registered or if max or weight is non-positive.
func (s *registry) AddSub(test interface{}, subTestName string, max, weight int) {
	tstName := fmt.Sprintf("%s/%s", testName(test), subTestName)
	s.add(tstName, "", max, weight)
}

// AddSubWithTask test with given taskName, max score and weight to the registry.
// This function should be used to register subtests, and should be used in
// conjunction with MaxByName and MinByName called from within a subtest.
// This function is identical to AddSub, with the addition of assigning a task name.
//
// Will panic if the test has already been registered or if max or weight is non-positive.
func (s *registry) AddSubWithTask(test interface{}, subTestName, taskName string, max, weight int) {
	tstName := fmt.Sprintf("%s/%s", testName(test), subTestName)
	s.add(tstName, taskName, max, weight)
}

// Max returns a score object with Score equal to MaxScore.
// The returned score object should be used with score.Dec() and score.DecBy().
//
// Will panic with unknown score test, if the test hasn't been added.
func (s *registry) Max() *Score {
	testName := callerTestName()
	sc := s.get(testName)
	sc.Score = sc.GetMaxScore()
	return sc
}

// Min returns a score object with Score equal to zero.
// The returned score object should be used with score.Inc() and score.IncBy().
//
// Will panic with unknown score test, if the test hasn't been added.
func (s *registry) Min() *Score {
	testName := callerTestName()
	return s.get(testName)
}

// MaxByName returns score object for the given test name with Score equal to MaxScore.
// This function is meant to be used from within subtests, and in conjunction with AddSub.
// The returned score object should be used with score.Dec() and score.DecBy().
//
// Will panic with unknown score test, if the test hasn't been added.
func (s *registry) MaxByName(testName string) *Score {
	sc := s.get(testName)
	sc.Score = sc.GetMaxScore()
	return sc
}

// MinByName returns a score object for the given test name with Score equal to zero.
// This function is meant to be used from within subtests, and in conjunction with AddSub.
// The returned score object should be used with score.Inc() and score.IncBy().
//
// Will panic with unknown score test, if the test hasn't been added.
func (s *registry) MinByName(testName string) *Score {
	return s.get(testName)
}

func testName(testFn interface{}) string {
	typ := reflect.TypeOf(testFn)
	if typ.Kind() != reflect.Func {
		panic(errMsg(reflect.ValueOf(testFn), "not a function"))
	}
	name := runtime.FuncForPC(reflect.ValueOf(testFn).Pointer()).Name()
	name = lastElem(name)
	if typ.NumIn() != 1 || typ.NumOut() > 0 || !strings.HasPrefix(name, "Test") {
		panic(errMsg(name, "not a test function"))
	}
	if !typ.In(0).AssignableTo(reflect.TypeOf(&testing.T{})) {
		panic(errMsg(name, "test function missing *testing.T argument"))
	}
	return name
}

func callerTestName() string {
	frame := callFrame()
	return lastElem(frame.Function)
}

func errMsg(testFn interface{}, msg string) error {
	frame := callFrame()
	return fmt.Errorf("%s:%d: %s: %v", filepath.Base(frame.File), frame.Line, msg, testFn)
}

func stripPkg(name string) string {
	start := strings.LastIndex(name, "/") + 1
	dot := strings.Index(name[start:], ".") + 1
	return name[start+dot:]
}

func lastElem(name string) string {
	return name[strings.LastIndex(name, ".")+1:]
}

func firstElem(name string) string {
	end := strings.Index(name, ".")
	if end < 0 {
		// No dots found in function name
		return name
	}
	return name[:end]
}

func (s *registry) add(testName, taskName string, max, weight int) {
	if _, found := s.scores[testName]; found {
		panic(errMsg(testName, "Duplicate score test"))
	}
	if max < 1 {
		panic(errMsg(testName, ErrMaxScore.Error()))
	}
	if weight < 1 {
		panic(errMsg(testName, ErrWeight.Error()))
	}
	sc := &Score{
		Secret:   sessionSecret,
		TestName: testName,
		TaskName: taskName,
		MaxScore: int32(max),
		Weight:   int32(weight),
	}
	// record the TestName in separate slice to preserve registration order
	s.testNames = append(s.testNames, testName)
	s.scores[testName] = sc
}

func (s *registry) get(testName string) *Score {
	callingTestName := callFrame()
	testFnName := stripPkg(callingTestName.Function)
	rootTestName := firstElem(testFnName)
	if !strings.HasPrefix(testName, rootTestName) {
		// Only the registered Test function can call the lookup functions
		panic(errMsg(testName, "unauthorized lookup"))
	}
	if sc, ok := s.scores[testName]; ok {
		return sc
	}
	panic(errMsg(testName, "unknown score test"))
}
