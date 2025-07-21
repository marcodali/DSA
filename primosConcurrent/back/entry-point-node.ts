import http from 'http'
import { URL } from 'url'

const PORT = 4004

interface Participant {
    place: number | null
    time: number | null
    count: number | null
}

interface Contest {
    python: Participant
    node: Participant
    golang: Participant
}

const parseBody = (req: http.IncomingMessage): Promise<Contest> => {
    return new Promise((resolve, reject) => {
        let body = ''
        req.on('error', (err) => reject(err))
        req.on('data', (chunk: Buffer) => { body += chunk.toString() })
        req.on('end', () => resolve(JSON.parse(body) as Contest))
    })
}

const handlePrimes = (contest: Contest, res: http.ServerResponse) => {
    console.info("received contest is", contest)
    res.writeHead(200, {'Content-Type': 'application/json'})

    contest.golang.place = 1
    contest.python.place = 2
    contest.node.place   = 3
    contest.golang.time  = 500
    contest.python.time  = 800
    contest.node.time    = 1400

    res.end(JSON.stringify(contest))
}

const server = http.createServer(
async (req: http.IncomingMessage, res: http.ServerResponse) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`)

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method == 'OPTIONS') {
        res.writeHead(200)
        res.end()
        return
    }

    if (parsedUrl.pathname == '/primes' && req.method == 'POST') {
        const parsedBody = await parseBody(req)
        handlePrimes(parsedBody, res)
    } else {
        res.writeHead(400, {'Content-Type': 'text/plain'})
        res.end('Cannot process')
    }
})

server.listen(PORT, () => {
    console.log("Server listening at", PORT)
})

