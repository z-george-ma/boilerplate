/// <reference path="../../typings/tsd"/>

import * as controller from "./controller"

export default function(app) {
  app.get('/things', controller.index)
}
