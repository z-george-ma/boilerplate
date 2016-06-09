/// <reference path="../../typings/index.d.ts"/>

import * as controller from "./controller"

export default function(app) {
  app.get('/things', controller.index)
}
