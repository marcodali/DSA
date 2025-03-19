package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestPatch(t *testing.T) {
	esposas := 3
	amantes := 4
	novias := 5
	total := "12" // esposas + amantes + novias
	server := setupServer()
	recorder := httptest.NewRecorder()
	noviasJson := map[string]int{"novias": novias}

	body, _ := json.Marshal(noviasJson)
	url := fmt.Sprintf("/marriage/%d?amantes=%d", esposas, amantes)
	request := httptest.NewRequest(http.MethodPatch, url, strings.NewReader(string(body)))
	request.Header.Set("Content-Type", "application/json")

	server.ServeHTTP(recorder, request)

	assert.Equal(t, http.StatusPartialContent, recorder.Code, "success code")
	assert.Contains(t, recorder.Body.String(), total, "the total sum should be present in the server answer")
}

func TestMalformedPatch(t *testing.T) {
	server := setupServer()
	recorder := httptest.NewRecorder()

	request := httptest.NewRequest(http.MethodPatch, "/marriage/1?amantes=2", strings.NewReader("novias=3"))
	request.Header.Set("Content-Type", "application/json")
	server.ServeHTTP(recorder, request)

	assert.Equal(t, http.StatusBadRequest, recorder.Code)
	assert.Contains(t, recorder.Header().Get("Content-Type"), "text/plain")
	assert.Contains(t, strings.ToLower(recorder.Body.String()), "no pude parsear el body")
}

func TestPut(t *testing.T) {
	server := setupServer()
	recorder := httptest.NewRecorder()

	request := httptest.NewRequest(http.MethodPut, "/marriage/", strings.NewReader("pretendientas=20"))
	request.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	server.ServeHTTP(recorder, request)

	assert.Equal(t, http.StatusMultiStatus, recorder.Code)
	assert.Contains(t, recorder.Header().Get("Content-Type"), "text/html")
	assert.Contains(t, recorder.Body.String(), "15") // 15 es el 75% de 20
}
