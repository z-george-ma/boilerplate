"use strict";

var io = require("socket.io");

module.exports = function(http) {
  io(http).on('connection', function (socket) {
    socket.emit("connected");
    socket.on('event', function (data) {
    });
  });
};

