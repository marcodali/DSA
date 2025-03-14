package main

import (
	"fmt"
	"strconv"

	"github.com/gin-gonic/gin"
)

type BodyPayload struct {
	Novias int `json:"novias"`
}

func main() {
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

	server.Run(":7070")
}
