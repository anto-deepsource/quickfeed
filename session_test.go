package aguis_test

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/autograde/aguis"
	"github.com/gorilla/sessions"
)

const loginSession = "login"

func TestLogin(t *testing.T) {
	store := sessions.NewCookieStore([]byte{})
	s := aguis.NewSessionStore(store, loginSession)

	w1 := httptest.NewRecorder()
	r1 := httptest.NewRequest(http.MethodGet, "/auth/github", nil)

	if err := s.Login(w1, r1); err != nil {
		t.Error(err)
	}

	var cookie *http.Cookie
	for _, c := range w1.Result().Cookies() {
		if c.Name == loginSession {
			cookie = c
		}
	}
	if cookie == nil {
		t.Error("have 'login cookie not set' want 'login cookie set")
	}

	w2 := httptest.NewRecorder()
	r2 := httptest.NewRequest(http.MethodGet, "/api/v1/test", nil)
	r2.AddCookie(cookie)

	ok, err := s.LoggedIn(w2, r2)
	if err != nil {
		t.Errorf("have '%s' want 'no error'", err)
	}
	if !ok {
		t.Error("have 'user not logged in' want 'user logged in'")
	}
}

func TestLogout(t *testing.T) {
	store := sessions.NewCookieStore([]byte{})
	s := aguis.NewSessionStore(store, loginSession)

	w1 := httptest.NewRecorder()
	r1 := httptest.NewRequest(http.MethodGet, "/logout", nil)

	if err := s.Logout(w1, r1); err != nil {
		t.Error(err)
	}

	var cookie *http.Cookie
	for _, c := range w1.Result().Cookies() {
		if c.Name == loginSession {
			cookie = c
		}
	}
	if cookie == nil {
		t.Error("have 'login cookie not set' want 'login cookie set")
	}

	w2 := httptest.NewRecorder()
	r2 := httptest.NewRequest(http.MethodGet, "/api/v1/test", nil)
	r2.AddCookie(cookie)

	ok, err := s.LoggedIn(w2, r2)
	if err != nil {
		t.Errorf("have '%s' want 'no error'", err)
	}
	if ok {
		t.Error("have 'user logged in' want 'user not logged in'")
	}
}
