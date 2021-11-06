const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now()
    }
    next()
})
server.post('/submit-post', (req, res) => {
    console.log(req)
    res.end('200 Ok')
})

server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})
