import express, { Request, Response } from 'express'
import cors from 'cors'

const PORT = 3005
const url = 'https://jsonplaceholder.typicode.com/users'

const app = express()
app.use(express.json())
app.use(cors())

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

const transformToUser = (u: any): User => ({
    id: u.id,
    name: u.name,
    username: u.username,
    email: u.email,
})

app.get("/users", async (req: Request, res: Response) => {
    const response = await fetch(url)
    const data = await response.json() as any[]
    const limit = Number(req.query.limit) || data.length
    const page: number = Number(req.query.page) || 1
    const dataPaginated = data.slice((page-1)*limit, page*limit)
    res.status(200).json(dataPaginated.map(transformToUser))
})

const server = app.listen(0 || PORT, () => {
    const address = server.address()
    if (address && typeof address == 'object') {
        console.log(`Listening at http://localhost:${address.port}`)
    }
})

