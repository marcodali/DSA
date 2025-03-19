package main

import (
	"fmt"
	"math/rand/v2"
	"net/http"

	"github.com/labstack/echo/v4"
)

type bodyParser struct {
	Model string `json:"model"`
}

var carTranslator = map[string]string{
	"subaru": "lancer",
	"lambo":  "susuki",
	"volvo":  "pagani",
}

var Server *echo.Echo

func setupServer() *echo.Echo {
	server := echo.New()
	server.POST("/cars/:toyota", func(ctx echo.Context) error {
		var carSlice []string

		toyota := ctx.Param("toyota")
		honda := ctx.QueryParam("honda")
		byd := ctx.FormValue("byd")

		carSlice = append(carSlice, toyota)
		carSlice = append(carSlice, honda)
		carSlice = append(carSlice, byd)

		response := echo.Map{
			"winner": fmt.Sprintf("comprate un %s es la mejor opcion", carSlice[rand.IntN(3)]),
		}
		return ctx.JSON(http.StatusOK, response)
	})

	server.PATCH("/cars", func(ctx echo.Context) error {
		var body bodyParser
		if err := ctx.Bind(&body); err != nil {
			fmt.Println("error trying to decode json:", err.Error())
			return ctx.String(http.StatusUnprocessableEntity, "cannot decode json")
		}
		return ctx.JSON(http.StatusResetContent, echo.Map{
			"en vez de un": fmt.Sprintf(
				"%s te recomiendo mejor un %s",
				body.Model,
				carTranslator[body.Model],
			),
		})
	})

	return server
}

func main() {
	Server = setupServer()
	Server.Start(":7676")
}
