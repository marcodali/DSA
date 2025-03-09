//import Express from 'express'
const Express = require('express')

const app = Express()

// middlewares to correctly parse the body payload depending on its format
app.use(Express.json())
app.use(Express.text())
app.use(Express.urlencoded({ extended: true }))

app.put("/comida", (req, res) => {
    if (!req.body.hasOwnProperty("budget")) {
        return res.status(401).send("No tienes hambre?")
    }
    const { budget } = req.body
    if (budget <= 0) {
        return res.status(201).json({"advice": "come jugo de universo"})
    } else if (budget <= 100) {
        return res.status(202).json({"advice": "come un burrito"})
    } else if (budget <= 1000) {
        return res.status(203).json({"advice": "come en el italianis"})
    }
    return res.status(204).send()
})

const server = app.listen(() => {
    console.log(`listening on ${server.address().port}`)
})

module.exports = { app, server }