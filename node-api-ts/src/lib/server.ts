/// <reference path="../typings/express/express.d.ts"/>

import express = require("express")
import routes = require("./route")
export let app = express()

// Server setup
app.use((req, res, next) => {
  console.info(`${req.method} ${req.path}`)
  res.contentType('application/json')
  next()
})

// Endpoints
app.get('/healthcheck', routes.healthcheck)
app.get('/'           , routes.index)
