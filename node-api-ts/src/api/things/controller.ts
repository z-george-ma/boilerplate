/// <reference path="../../typings/tsd.d.ts"/>

import * as restify from "restify"

export let index =
  (req: restify.Request, res: restify.Response) => {
	  res.status(200)
    res.end()
  }
