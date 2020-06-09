"use strict";
const scanner = (source) => {
    const NUMBER_REGEX = /^(\+|-)?\d+((\.\d+)?(e(\+|-)\d+)?)?$|^(\+|-)?\.\d+(e(\+|-)\d+)?$/i;
    let buffer;
    if (typeof source === 'string') {
        buffer = source;
    }
    else if (Array.isArray(source)) {
        buffer = source.slice().join('');
    }
    else {
        throw new TypeError('Input must be a string or an Array.<string>');
    }
    const next = (retainElement) => {
        if (!buffer)
            return null;
        const regex = /^\s*([^\s]+)/;
        const ret = regex.exec(buffer);
        if (ret) {
            if (!retainElement)
                buffer = buffer.replace(regex, '');
            return ret[1];
        }
        if (!retainElement)
            buffer = '';
        return ret;
    };
    const nextLine = (retainElement) => {
        if (!buffer)
            return null;
        const regex = /^([^\r\n]*)(?:\r\n|\n|$)/;
        const ret = regex.exec(buffer);
        if (ret) {
            if (!retainElement)
                buffer = buffer.replace(regex, '');
            return ret[1];
        }
        if (!retainElement)
            buffer = '';
        return null;
    };
    const nextNumber = (retainElement) => {
        const res = next(retainElement);
        if (typeof res === 'string' && NUMBER_REGEX.test(res))
            return parseFloat(res);
        else
            throw new TypeError('Not a number');
    };
    return {
        next() {
            return next(false);
        },
        hasNext() {
            const obj = next(true);
            return typeof obj === 'string';
        },
        nextLine() {
            return nextLine(false);
        },
        hasNextLine() {
            const obj = nextLine(true);
            return typeof obj === 'string';
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
module.exports = scanner;
