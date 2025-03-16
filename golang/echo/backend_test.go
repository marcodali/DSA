package main

import (
	"fmt"
	"math/rand/v2"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func ContainSomeOption(t *testing.T, options []string, haystack string) bool {
	for _, option := range options {
		if strings.Contains(haystack, option) {
			t.Logf("winner option: %s, haystack: %s", option, haystack)
			return true
		}
	}
	return false
}

func TestServer(t *testing.T) {
	options := []string{"camaro", "shellby", "chevy"}
	recorder := httptest.NewRecorder()
	server := setupServer()

	url := fmt.Sprintf("/cars/%s?honda=%s", options[rand.IntN(3)], options[rand.IntN(3)])
	body := strings.NewReader("byd=" + options[rand.IntN(3)])
	request := httptest.NewRequest(http.MethodPost, url, body)
	request.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	server.ServeHTTP(recorder, request)

	assert.Equal(t, http.StatusOK, recorder.Code)
	assert.True(t, ContainSomeOption(t, options, recorder.Body.String()), "one of the sample cars should appear in the response")
}
