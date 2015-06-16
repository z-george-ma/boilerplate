/// <reference path="typings/node/node.d.ts"/>
"use strict";

var express = require("express"),
    app = express();

app.use(express.static("website"));
require("./lib/api")(app);
require("./lib/healthcheck")(app);
require("./lib/error")(app);

var port = +process.env.PORT || 80;
app.listen(port);
