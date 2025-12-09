const fetch = require('node-fetch');
const shell = require('shelljs');
const minimist = require('minimist');
const parser = require('ua-parser-js');

console.log("Garnet Lab App running...");

// harmless fetch call (Garnet monitors egress)
fetch("https://example.com").then(() => console.log("Fetch completed"));

// shelljs attempt (Garnet catches shell execution)
shell.exec("echo test-shell-exec");

// parse UA (benign behavior)
console.log(parser("Mozilla/5.0"));
