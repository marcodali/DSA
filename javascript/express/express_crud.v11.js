import Express from 'express'

const server = Express()

server.listen(() => {
    console.log(`listening on ${server.address()}`)
})