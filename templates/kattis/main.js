"use strict";

const scanner = require('./scanner.js');

const print = args => process.stdout.write(`${args}`);
const println = (args = '') => process.stdout.write(`${args}\n`);

const main = () => {
    let input = scanner(stdin);
    // code
};

let stdin = [];
init: {
    const EXIT = err => {
        if (err instanceof Error) {
            process.stderr.write(`${err.name}\n${err.message}\n${err.stack || ''}`);
        } else {
            main();
        }
        process.exit(0);
    };
    process.stdin.setEncoding('utf8');
    process.stdin.on('readable', () => {
        let chunk;
        while ((chunk = process.stdin.read()) !== null)
            stdin.push(chunk);
    });
    process.stdin.on('end', EXIT);
    process.on('SIGINT', EXIT);
    process.on('uncaughtException', EXIT);
}