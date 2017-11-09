#!/usr/bin/env node

var serialserver = require('./libraries/server.js');
serialserver.start();
console.log("Server is running");
