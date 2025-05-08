package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

var Server *gin.Engine

func setupServer() *gin.Engine {
	server := gin.Default()
	server.GET("/ping", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	return server
}

func main() {
	Server = setupServer()
	Server.Run(":8080")
}
