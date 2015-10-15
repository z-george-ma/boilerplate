/// <reference path="../typings/tsd"/>
import * as restify from "restify"

export let healthcheck =
  (req: restify.Request, res: restify.Response) => {
    res.status(200)
    res.end("Server OK!")
  }

export let index =
  (req: restify.Request, res: restify.Response) => {
	  res.status(200)
    res.end()
  }
