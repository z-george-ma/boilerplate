/// <reference path="../typings/tsd"/>

import * as restify from "restify"
import * as routes from "./route"
export let app = restify.createServer()

// Server setup
app.use(restify.bodyParser())

app.use((req, res, next) => {
  console.info(`${req.method} ${req.path()}`)
  res.contentType = 'application/json'
  next()
})

// Endpoints
app.get('/healthcheck', routes.healthcheck)
app.get('/'           , routes.index)
