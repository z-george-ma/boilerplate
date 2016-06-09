/// <reference path="../typings/index.d.ts"/>
import * as restify from "restify"
import things from "./things/index"

export let app = restify.createServer()

// Server setup
app.use(restify.bodyParser())

app.use((req, res, next) => {
  console.info(`${req.method} ${req.path()}`)
  res.contentType = 'application/json'
  next()
})

app.get('/healthcheck', (req: restify.Request, res: restify.Response) => {
  res.status(200)
  res.end("Server OK!")
})

things(app)
