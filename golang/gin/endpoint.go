package main

import (
	"fmt"
	"math"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type BodyPayload struct {
	Novias int `json:"novias"`
}

var Server *gin.Engine

func setupServer() *gin.Engine {
	server := gin.Default()

	server.PATCH("/marriage/:esposas", func(ctx *gin.Context) {
		esposas, _ := strconv.Atoi(ctx.Param("esposas"))
		amantes, _ := strconv.Atoi(ctx.Query("amantes"))

		var payload BodyPayload
		if err := ctx.BindJSON(&payload); err != nil {
			ctx.String(http.StatusBadRequest, "No pude parsear el body %v", err)
			return
		}

		response := gin.H{
			"hembras": fmt.Sprintf("Tienes en total %d hembras", payload.Novias+esposas+amantes),
		}
		ctx.JSON(206, response)
	})

	server.PUT("/marriage/", func(ctx *gin.Context) {
		quedantes, _ := strconv.ParseInt(ctx.PostForm("pretendientas"), 10, 64)
		ctx.HTML(http.StatusMultiStatus, "hola.tmpl", gin.H{
			"quedantes":          quedantes,
			"quedantesAjustados": int64(math.Floor(float64(quedantes) * 0.75)),
		})
	})

	server.LoadHTMLGlob("plantillas/*")
	return server
}

func main() {
	Server = setupServer()
	Server.Run(":7070")
}
