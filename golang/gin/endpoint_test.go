package main

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGoodEndpoint(t *testing.T) {
	esposas := 3
	amantes := 4
	novias := 5
	total := "12" // esposas + amantes + novias
	server := setupServer()
	recorder := httptest.NewRecorder()

	url := fmt.Sprintf("/marriage/%d?amantes=%d", esposas, amantes)
	body := fmt.Sprintf("{\"novias\": %d}", novias)
	request := httptest.NewRequest(http.MethodPatch, url, strings.NewReader(body))
	request.Header.Set("Content-Type", "application/json")

	server.ServeHTTP(recorder, request)

	assert.Equal(t, http.StatusPartialContent, recorder.Code, "success code")
	assert.Contains(t, recorder.Body.String(), total, "the total sum should be present in the server answer")
}

func TestBadEndpoint(t *testing.T) {
	server := setupServer()
	recorder := httptest.NewRecorder()
	url := fmt.Sprintf("/marriage/%d?amantes=%d", 1, 2)
	request := httptest.NewRequest(http.MethodGet, url, nil)

	server.ServeHTTP(recorder, request)

	assert.Equal(t, http.StatusNotFound, recorder.Code, "because this method was not implemented")
}
