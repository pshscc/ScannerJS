const { assert, expect } = require('chai');
const scanner = require('../../scanner');

describe('Scanner', function () {
    describe('#nextNumber()', function () {
        it('should throw a TypeError when intialized with empty string', function () {
            const sc = scanner('');
            assert.throws(sc.nextNumber, TypeError);
        });
        it('should throw a TypeError when intialized with empty array', function () {
            const sc = scanner([]);
            assert.throws(sc.nextNumber, TypeError);
        });
        it('should throw a TypeError when the next element is not a number', function () {
            const sc = scanner('hello');
            assert.throws(sc.nextNumber, TypeError);
        });
        it(`should return a positive number when it is in ${/\d+/}`, function () {
            const sc = scanner('1');
            const val = sc.nextNumber();
            assert.strictEqual(val, 1);
        });
        it(`should return a positive number when it is in ${/\+\d+/}`, function () {
            const sc = scanner('+1');
            const val = sc.nextNumber();
            assert.strictEqual(val, 1);
        });
        it(`should return a negative number when it is in ${/-\d+/}`, function () {
            const sc = scanner('-1');
            const val = sc.nextNumber();
            assert.strictEqual(val, -1);
        });
        it(`should return a number with a decimal when it is in ${/\d+\.\d+/}`, function () {
            const sc = scanner('1.2');
            const val = sc.nextNumber();
            assert.strictEqual(val, 1.2);
        });
        it(`should return a number when it is in ${/\d+\.\d+e\+\d+/}`, function () {
            const sc = scanner('1.2e+2');
            const val = sc.nextNumber();
            assert.strictEqual(val, 1.2e+2);
        });
        it(`should return a number when it is in ${/\d+\.\d+E\+\d+/}`, function () {
            const sc = scanner('1.2E+2');
            const val = sc.nextNumber();
            assert.strictEqual(val, 1.2e+2);
        });
        it(`should return a number when it is in ${/\d+\.\d+e-\d+/}`, function () {
            const sc = scanner('1.2e-2');
            const val = sc.nextNumber();
            assert.strictEqual(val, 1.2e-2);
        });
        it(`should return a number when it is in ${/\.\d+e-\d+/}`, function () {
            const sc = scanner('.2e-2');
            const val = sc.nextNumber();
            assert.strictEqual(val, 0.2e-2);
        });
        it(`should return a number when it is in ${/\.\d+e\+\d+/}`, function () {
            const sc = scanner('.2e+2');
            const val = sc.nextNumber();
            assert.strictEqual(val, 0.2e+2);
        });
    });
});