/// <reference path="../typings/mocha/mocha.d.ts"/>
"use strict";

var should = require("should");

describe("1 + 1", function() {
  var actualOutput;

  before(function(done) {
    actualOutput = 1 + 1;
    done();
  });

  it("equals 2", function() {
    actualOutput.should.eql(2);
  });
});

