const { assert } = require('chai');
const scanner = require('../../scanner');

describe('Scanner', function () {
    describe('#hasNextNumber()', function () {
        it('should return false when intialized with empty string', function () {
            const sc = scanner('');
            const val = sc.hasNextNumber();
            assert.strictEqual(val, false);
        });
        it('should return false when intialized with empty array', function () {
            const sc = scanner([]);
            const val = sc.hasNextNumber();
            assert.strictEqual(val, false);
        });
        it('should return false when the next element is not a number', function () {
            const sc = scanner('hello');
            const val = sc.hasNextNumber();
            assert.strictEqual(val, false);
        });
        it(`should return true when it is in ${/\d+/}`, function () {
            const sc = scanner('1');
            const val = sc.hasNextNumber();
            assert.strictEqual(val, true);
        });
        it(`should return true when it is in ${/\+\d+/}`, function () {
            const sc = scanner('+1');
            const val = sc.hasNextNumber();
            assert.strictEqual(val, true);
        });
        it(`should return true when it is in ${/-\d+/}`, function () {
            const sc = scanner('-1');
            const val = sc.hasNextNumber();
            assert.strictEqual(val, true);
        });
        it(`should return true when it is in ${/\d+\.\d+/}`, function () {
            const sc = scanner('1.2');
            const val = sc.hasNextNumber();
            assert.strictEqual(val, true);
        });
        it(`should return true when it is in ${/\d+\.\d+e\+\d+/i}`, function () {
            const sc = scanner('1.2e+2');
            const val = sc.hasNextNumber();
            assert.strictEqual(val, true);
        });
        it(`should return true when it is in ${/\d+\.\d+E\+\d+/i}`, function () {
            const sc = scanner('1.2E+2');
            const val = sc.hasNextNumber();
            assert.strictEqual(val, true);
        });
        it(`should return true when it is in ${/\d+\.\d+e-\d+/i}`, function () {
            const sc = scanner('1.2e-2');
            const val = sc.hasNextNumber();
            assert.strictEqual(val, true);
        });
        it(`should return true when it is in ${/\.\d+e-\d+/i}`, function () {
            const sc = scanner('.2e-2');
            const val = sc.hasNextNumber();
            assert.strictEqual(val, true);
        });
        it(`should return true when it is in ${/\.\d+e\+\d+/i}`, function () {
            const sc = scanner('.2e+2');
            const val = sc.hasNextNumber();
            assert.strictEqual(val, true);
        });
        it('should return same value if consecutive calls', function () {
            const sc = scanner('1');
            const expected = sc.hasNextNumber();
            const actual = sc.hasNextNumber();
            assert.strictEqual(actual, expected);
        });
    });
});