/// <reference path="typings/node/node.d.ts"/>
"use strict";

var app = require("express")();

require("./lib/api")(app);
require("./lib/healthcheck")(app);

var port = +process.env.PORT || 80;
app.listen(port);
