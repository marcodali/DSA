package main

import (
	"encoding/json"
	"fmt"
	"math/rand/v2"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestPostRequest(t *testing.T) {
	options := []string{"camaro", "shellby", "chevy"}
	recorder := httptest.NewRecorder()
	server := setupServer()

	url := fmt.Sprintf("/cars/%s?honda=%s", options[rand.IntN(3)], options[rand.IntN(3)])
	body := strings.NewReader("byd=" + options[rand.IntN(3)])
	request := httptest.NewRequest(http.MethodPost, url, body)
	request.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	server.ServeHTTP(recorder, request)
	var response map[string]string
	var one, two, thirdWord string
	err := json.Unmarshal(recorder.Body.Bytes(), &response)
	fmt.Sscanf(response["winner"], "%s %s %s", &one, &two, &thirdWord)

	assert.NoError(t, err)
	assert.Equal(t, "application/json", recorder.Header().Get("Content-Type"))
	assert.Equal(t, http.StatusOK, recorder.Code)
	assert.Contains(t, options, thirdWord, "one of the options should be in the response")
}

func TestPatchMalformedRequest(t *testing.T) {
	badRecorder := httptest.NewRecorder()
	server := setupServer()
	malformedBody := strings.NewReader("model=lambo")

	badRequest := httptest.NewRequest(http.MethodPatch, "/cars", malformedBody)
	badRequest.Header.Set("Content-Type", "application/json")
	server.ServeHTTP(badRecorder, badRequest)

	assert.Contains(t, badRecorder.Header().Get("Content-Type"), "text/plain")
	assert.Equal(t, http.StatusUnprocessableEntity, badRecorder.Code)
	assert.Equal(t, "cannot decode json", badRecorder.Body.String())
}

func TestPatchRequest(t *testing.T) {
	recorder := httptest.NewRecorder()
	server := setupServer()
	j1 := map[string]string{"model": "lambo"}
	j2, _ := json.Marshal(j1)
	body := strings.NewReader(string(j2))

	request := httptest.NewRequest(http.MethodPatch, "/cars", body)
	request.Header.Set("Content-Type", "application/json")
	server.ServeHTTP(recorder, request)

	assert.Equal(t, "application/json", recorder.Header().Get("Content-Type"))
	assert.Equal(t, http.StatusResetContent, recorder.Code)
	assert.Contains(t, recorder.Body.String(), "susuki")
}
