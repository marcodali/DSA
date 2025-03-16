package main

import (
	"fmt"
	"math/rand/v2"

	"github.com/labstack/echo/v4"
)

var Server *echo.Echo

func setupServer() *echo.Echo {
	Server = echo.New()
	Server.POST("/cars/:toyota", func(ctx echo.Context) error {
		var carSlice []string

		toyota := ctx.Param("toyota")
		honda := ctx.QueryParam("honda")
		byd := ctx.FormValue("byd")

		carSlice = append(carSlice, toyota)
		carSlice = append(carSlice, honda)
		carSlice = append(carSlice, byd)

		response := map[string]string{
			"winner": fmt.Sprintf("comprate un %s es la mejor opcion", carSlice[rand.IntN(3)]),
		}
		return ctx.JSON(200, response)
	})
	return Server
}

func main() {
	server := setupServer()
	server.Start(":7676")
}
