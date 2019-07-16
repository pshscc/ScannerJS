"use strict";
/**
 * @typedef {object} Scanner
 * @property {function} next [See here]{@link next}
 * @property {function} hasNext [See here]{@link hasNext}
 * @property {function} nextLine [See here]{@link nextLine}
 * @property {function} hasNextLine [See here]{@link hasNextLine}
 * @property {function} nextNumber [See here]{@link nextNumber}
 * @property {function} hasNextNumber [See here]{@link hasNextNumber}
 */
/**
 * Returns a Java-like [Scanner](https://docs.oracle.com/javase/10/docs/api/java/util/Scanner.html) that uses a source to parse
 * @param {string[]|string} source the source to parse
 * @returns {Scanner} the Scanner object
 * @public
 * @throws {TypeError} Will throw an error if the given source is not of type Array.<string> or string
 */
const scanner = (source) => {
    const NUMBER_REGEX = /^(\+|-)?\d+((\.\d+)?(e(\+|-)\d+)?)?$|^(\+|-)?\.\d+(e(\+|-)\d+)?$/i;
    let buffer;
    let bufferPointer = 0;
    let bufferIndex = 0;
    if (typeof source === 'string') {
        buffer = [source];
    }
    else if (typeof source === 'object' && source.constructor === Array) {
        // doesnt truly check if the array is entirely strings due to possible decrease in performance
        buffer = source.slice();
    }
    else {
        throw new TypeError('Input must be a string or an Array.<string>');
    }
    /**
     * Returns an object with a value that represents the next element in the buffer separated by whitespace or null if the buffer is empty and the number of characters read during the call
     * @returns {{value: ?string, charactersRead: number}} an object with a value that represents the next element in the buffer separated by whitespace or null if the buffer is empty and the number of characters read during the call
     * @private
     */
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
        // last character read is conserved or is EOF and is not considered a character.
        // Ensures count >= 0
        count = Math.max(0, count - 1);
        if (cur)
            bufferPointer--; // conserve the last character since it's not apart of the returned value
        else if (res === '') // should only happen when buffer reached EOF
            // calling next() when it's EOF should return null when the buffer is empty
            return { value: null, charactersRead: count };
        return { value: res, charactersRead: count };
    };
    /**
     * Returns an object with a value that represents the next line in the buffer separated by whitespace or null if the buffer is empty and the number of characters read during the call
     * @returns {{value: ?string, charactersRead: number}} an object with a value that represents the next line in the buffer separated by a new line or null if the buffer is empty and the number of characters read during the call
     * @private
     */
    const nextLine = () => {
        let res = '', count = 1, cur = read();
        while (cur && cur !== '\r' && cur !== '\n') { // account for new line endings of '\r\n' and '\n'
            res += cur;
            cur = read();
            count++;
        }
        if (cur === '\r') {
            count++;
            cur = read(); // get the '\n' that follows '\r'
        }
        if (cur === null)
            count--; // decrease by 1 due to a value of null meaning EOF which does not count as a character read
        if (res === '') {
            // an empty line should return an empty string ('')
            // return null only happens when buffer reached EOF
            return { value: cur === '\n' ? res : null, charactersRead: count };
        }
        return { value: res, charactersRead: count };
    };
    /**
     * Obtains the next non-whitespace element separated by whitespace in the buffer as a number
     * @param {boolean} retainElement determines whether the value received from next is to be considered in the buffer
     * @returns {number} the next element in the buffer as a number
     * @private
     * @throws {TypeError} Will throw an error if the next element is not a number
     */
    const nextNumber = (retainElement) => {
        const res = next();
        if (retainElement)
            bufferPointer -= res.charactersRead; // reset position of buffer due to only check if a number exists in hasNextNumber()
        if (typeof res.value === 'string' && NUMBER_REGEX.test(res.value)) // integer/double regex
            return parseFloat(res.value);
        else
            throw new TypeError('Not a number');
    };
    /**
     * Returns the current character to be read in the buffer, otherwise null if all characters have been read in the buffer
     * @returns {?string} the current character to be read in the buffer, otherwise null if all characters have been read in the buffer
     * @private
     */
    const read = () => {
        if (!buffer.length) // prevent crashing when a method is called from a Scanner that is instantiated with an empty array e.g. scanner([]).next()
            return null;
        let EOF = bufferIndex === buffer.length - 1 && bufferPointer === buffer[bufferIndex].length;
        while (bufferPointer < 0) { // bufferPointer can be negative due to the subtraction in `nextNumber(retainElement)` and `next()`
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
    /**
     * Determines whether the character is whitespace
     * @param {?string} cur the single character to check
     * @returns true if the given character is whitespace, false otherwise
     * @private
     */
    const isWhitespace = (cur) => cur === ' ' || cur == '\n' || cur == '\r';
    return {
        /**
         * Obtains the next non-whitespace element in the buffer separated by whitespace
         * @returns {?string} the next element in the buffer separated by whitespace or null if the buffer is empty
         * @public
         */
        next() {
            return next().value;
        },
        /**
         * Determines whether a non-whitespace element separated by whitespace exists in the buffer
         * @returns {boolean} true if an element exists that is not whitespace in the buffer and is not EOF (End-of-File), false otherwise
         * @public
         */
        hasNext() {
            const obj = next();
            bufferPointer -= obj.charactersRead; // reset position of buffer due to only checking if it exists
            return typeof obj.value === 'string';
        },
        /**
         * Obtains the remaining parts of a line. If {@link next} or {@link nextNumber} is used to capture the last element of a line,
         * this will return an empty string. To prevent this, the buffer must be flushed (see example).
         * @returns {?string} the remaining parts of a line or null if the buffer is empty
         * @public
         * @example
         * // input simulation where `System.in` contains the following:
         * // hello 1
         * // happy birthday
         * // incorrect example using the same input as above
         * var input = scanner(System.in);
         * var word = input.next(); // has the value "hello"
         * var value = input.nextNumber(); // will have the value 1
         * var line = input.nextLine(); // has the value of an empty string ("")
         *
         * // correct example
         * var input = scanner(System.in);
         * var word = input.next(); // has the value "hello"
         * var value = input.nextNumber(); // has the the value 1
         * input.nextLine() // flushes the buffer (removes the newline character "\n")
         * var line = input.nextLine(); // correctly gets the next line (has the value "happy birthday")
         */
        nextLine() {
            return nextLine().value;
        },
        /**
         * Determines whether there are lines available in the buffer
         * @returns {boolean} true if there are lines available in the buffer, false otherwise
         * @public
         */
        hasNextLine() {
            const obj = nextLine();
            bufferPointer -= obj.charactersRead; // reset position of buffer due to only checking if it exists
            return typeof obj.value === 'string';
        },
        /**
         * Obtains the next non-whitespace element separated by whitespace in the buffer as a number
         * @returns {number} the next element in the buffer as a number
         * @public
         * @throws {TypeError} Will throw an error if the next element is not a number
         */
        nextNumber() {
            return nextNumber(false);
        },
        /**
         * Determines whether the next non-whitespace element separated by whitespace is a number
         * @returns {boolean} true if the next element is a number, false otherwise
         * @public
         */
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
