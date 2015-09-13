/// <reference path="../typings/express/express.d.ts"/>
import express = require("express")

export let healthcheck = 
  (req: express.Request, res: express.Response) => {
    res.status(200).end("Server OK!")
  }

export let index = 
  (req: express.Request, res: express.Response) => {
	res.status(200).end()
  }
