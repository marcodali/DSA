import Express from 'express'

const paraQueMeAlcanza = (budget) => {
    if (budget <= 10) {
        return "mojarra"
    } else if (budget <= 100) {
        return "cangrejo"
    } else if (budget <= 1000) {
        return "tortuga"
    } else {
        return "langosta"
    }
}

const server = Express()

server.post("/comida", (req, res) => {
    const { budget } = req.body
    if (budget <= 0) {
        return res.status(401).send("No te alcanza para nada")
    }
    const comida = paraQueMeAlcanza(budget)
    return res.status(202).json({"food": `Con ${budget} te alcanza para pedir ${food}`})
})

server.listen((err) => {
    if (err) {
        console.error("Error happened", err)
        process.exit(0)
    }
    console.log("listening on 5050")
})