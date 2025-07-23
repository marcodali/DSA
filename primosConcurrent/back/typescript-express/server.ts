import express, {Request, Response} from 'express'

const PORT = 5005
const app = express()

app.use(express.json())

function generatePrimesUpTo(num: number) {
    const sieve = [...Array(num+1)].map(_=>true)
    for (let i = 2; i*i <= num; i += 1) {
        if (sieve[i]) {
            for (let j = i*i; j <= num; j += i) {
                sieve[j] = false
            }
        }
    }
}

app.get("/dog", (req: Request, res: Response) => {
    const goal = Number(req.query.goal)
    const init_time = performance.now()
    generatePrimesUpTo(goal)
    const end_time = performance.now()
    res.status(200).json({
        time: end_time - init_time,
        job: "done"
    })
})

const server = app.listen(PORT, () => {
    const address = server.address()
    if (address && typeof address == 'object') {
        console.log("Listening at port", address.port)
    }
})

