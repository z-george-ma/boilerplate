/// <reference path="typings/node/node.d.ts"/>
"use strict";

var express = require("express"),
    app = express(),
    http = require('http').Server(app);

app.use(express.static("website"));

require("./lib/api")(app);
require("./lib/healthcheck")(app);
require("./lib/error")(app);

var port = +process.env.PORT || 80;
http.listen(port);
require("./lib/io")(http);
