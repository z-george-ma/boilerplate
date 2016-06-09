///<reference path='../typings/index.d.ts'/>

import * as restify from 'restify'
import things from '../api/things/index'

let hippie = require('hippie')
let app = restify.createServer()
things(app)

describe("Things API", () => {
  describe("/things endpoint", () => {
    it("should return 200", done => {
      hippie(app)
        .json()
        .get('/things')
        .expectStatus(200)
        .end((err, res, body) => {
          done(err)
          app.close()
        })
    })
  })
})

