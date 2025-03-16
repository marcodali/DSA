package main

import (
	"fmt"
	"strconv"

	"github.com/gin-gonic/gin"
)

type BodyPayload struct {
	Novias int `json:"novias"`
}

var Server *gin.Engine

func setupServer() *gin.Engine {
	server := gin.Default()

	server.PATCH("/marriage/:esposas", func(context *gin.Context) {
		esposas, _ := strconv.Atoi(context.Param("esposas"))
		amantes, _ := strconv.Atoi(context.Query("amantes"))

		var payload BodyPayload
		if err := context.BindJSON(&payload); err != nil {
			context.String(400, "No pude parsear el body %v", err)
			return
		}

		response := gin.H{
			"hembras": fmt.Sprintf("Tienes en total %d hembras", payload.Novias+esposas+amantes),
		}
		context.JSON(206, response)
	})

	return server
}

func main() {
	Server = setupServer()
	Server.Run(":7070")
}
