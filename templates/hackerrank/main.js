"use strict";

let stdin = [];
init: {
    const EXIT = err => {
        if (err instanceof Error) {
            process.stderr.write(err);
            process.stderr.write('\n');
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
const print = args => process.stdout.write(`${args}`);
const println = (args = '') => process.stdout.write(`${args}\n`);

const main = () => {
    let input = scanner(stdin);
    // code
};

const scanner = (source) => {
    const NUMBER_REGEX = /^(\+|-)?\d+((\.\d+)?(e(\+|-)\d+)?)?$|^(\+|-)?\.\d+(e(\+|-)\d+)?$/i;
    let buffer;
    let bufferPointer = 0;
    let bufferIndex = 0;
    if (typeof source === 'string') {
        buffer = [source];
    }
    else if (Array.isArray(source)) {
        buffer = source.slice();
    }
    else {
        throw new TypeError('Input must be a string or an Array.<string>');
    }
    const next = () => {
        let res = '', count = 0, cur;
        do {
            cur = read();
            count++;
        } while (isWhitespace(cur));
        while (cur && !isWhitespace(cur)) {
            res += cur;
            cur = read();
            count++;
        }
        count = Math.max(0, count - 1);
        if (cur)
            bufferPointer--;
        else if (res === '')
            return { value: null, charactersRead: count };
        return { value: res, charactersRead: count };
    };
    const nextLine = () => {
        let res = '', count = 1, cur = read();
        while (cur && cur !== '\r' && cur !== '\n') {
            res += cur;
            cur = read();
            count++;
        }
        if (cur === '\r') {
            count++;
            cur = read();
        }
        if (cur === null)
            count--;
        if (res === '') {
            return { value: cur === '\n' ? res : null, charactersRead: count };
        }
        return { value: res, charactersRead: count };
    };
    const nextNumber = (retainElement) => {
        const res = next();
        if (retainElement)
            bufferPointer -= res.charactersRead;
        if (typeof res.value === 'string' && NUMBER_REGEX.test(res.value))
            return parseFloat(res.value);
        else
            throw new TypeError('Not a number');
    };
    const read = () => {
        if (!buffer.length)
            return null;
        let EOF = bufferIndex === buffer.length - 1 && bufferPointer === buffer[bufferIndex].length;
        while (bufferPointer < 0) {
            bufferIndex--;
            bufferPointer += buffer[bufferIndex].length;
        }
        if (!EOF && bufferPointer === buffer[bufferIndex].length) {
            bufferIndex++;
            bufferPointer = 0;
            EOF = bufferIndex === buffer.length - 1 && bufferPointer === buffer[bufferIndex].length;
        }
        if (EOF)
            return null;
        return buffer[bufferIndex][bufferPointer++];
    };
    const isWhitespace = (cur) => cur === ' ' || cur == '\n' || cur == '\r';
    return {
        next() {
            return next().value;
        },
        hasNext() {
            const obj = next();
            bufferPointer -= obj.charactersRead;
            return typeof obj.value === 'string';
        },
        nextLine() {
            return nextLine().value;
        },
        hasNextLine() {
            const obj = nextLine();
            bufferPointer -= obj.charactersRead;
            return typeof obj.value === 'string';
        },
        nextNumber() {
            return nextNumber(false);
        },
        hasNextNumber() {
            try {
                nextNumber(true);
                return true;
            }
            catch (err) {
                return false;
            }
        }
    };
};