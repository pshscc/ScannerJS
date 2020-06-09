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
 * @throws {TypeError} Will throw an error if the given source is not of type Array.&lt;string&gt; or string
 */
const scanner = (source: string | string[]) => {
    const NUMBER_REGEX = /^(\+|-)?\d+((\.\d+)?(e(\+|-)\d+)?)?$|^(\+|-)?\.\d+(e(\+|-)\d+)?$/i;
    let buffer: string;

    if (typeof source === 'string') {
        buffer = source;
    } else if (Array.isArray(source)) {
        buffer = source.slice().join('');
    } else {
        throw new TypeError('Input must be a string or an Array.<string>');
    }

    /**
     * Returns a string that represents the next element in the buffer separated by whitespace or null if the buffer is empty
     * @param {boolean} retainElement determines whether the value retrieved is to remain in the buffer
     * @returns {?string} a string that represents the next element in the buffer separated by whitespace or null if the buffer is empty
     * @private
     */
    const next = (retainElement: boolean): string | null => {
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

    /**
     * Returns a string that represents the next line in the buffer separated by whitespace or null if the buffer is empty
     * @param {boolean} retainElement determines whether the value retrieved is to remain in the buffer
     * @returns {?string} a string that represents the next line in the buffer separated by whitespace or null if the buffer is empty
     * @private
     */
    const nextLine = (retainElement: boolean): string | null => {
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

    /**
     * Obtains the next non-whitespace element separated by whitespace in the buffer as a number
     * @param {boolean} retainElement determines whether the value retrieved is to remain in the buffer
     * @returns {number} the next element in the buffer as a number
     * @private
     * @throws {TypeError} Will throw an error if the next element is not a number
     */
    const nextNumber = (retainElement: boolean): number => {
        const res = next(retainElement);
        if (typeof res === 'string' && NUMBER_REGEX.test(res))  // integer/double regex
            return parseFloat(res);
        else
            throw new TypeError('Not a number');
    };

    return {
        /** 
         * Obtains the next non-whitespace element in the buffer separated by whitespace
         * @returns {?string} the next element in the buffer separated by whitespace or null if the buffer is empty
         * @public
         */
        next(): string | null {
            return next(false);
        },
        /**
         * Determines whether a non-whitespace element separated by whitespace exists in the buffer
         * @returns {boolean} true if an element exists that is not whitespace in the buffer and is not EOF (End-of-File), false otherwise
         * @public
         */
        hasNext(): boolean {
            const obj = next(true);
            return typeof obj === 'string';
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
         * // incorrect way using the same input as above
         * var input = scanner(System.in);
         * var word = input.next(); // has the value "hello"
         * var value = input.nextNumber(); // will have the value 1
         * var line = input.nextLine(); // has the value of an empty string ("")
         * 
         * // correct way
         * var input = scanner(System.in);
         * var word = input.next(); // has the value "hello"
         * var value = input.nextNumber(); // has the the value 1
         * input.nextLine() // flushes the buffer (removes the newline character "\n")
         * var line = input.nextLine(); // correctly gets the next line (has the value "happy birthday")
         */
        nextLine(): string | null {
            return nextLine(false);
        },
        /**
         * Determines whether there are lines available in the buffer
         * @returns {boolean} true if there are lines available in the buffer, false otherwise
         * @public
         */
        hasNextLine(): boolean {
            const obj = nextLine(true);
            return typeof obj === 'string';
        },
        /**
         * Obtains the next non-whitespace element separated by whitespace in the buffer as a number
         * @returns {number} the next element in the buffer as a number
         * @public
         * @throws {TypeError} Will throw an error if the next element is not a number
         */
        nextNumber(): number {
            return nextNumber(false);
        },
        /**
         * Determines whether the next non-whitespace element separated by whitespace is a number
         * @returns {boolean} true if the next element is a number, false otherwise
         * @public
         */
        hasNextNumber(): boolean {
            try {
                nextNumber(true);
                return true;
            } catch (err) {
                return false;
            }
        }
    };
};

export = scanner;