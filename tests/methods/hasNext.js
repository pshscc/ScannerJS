const { assert } = require('chai');
const scanner = require('../../scanner');

describe('Scanner', function () {
    describe('#hasNext()', function () {
        it('should return false when intialized with empty string', function () {
            const sc = scanner('');
            const val = sc.hasNext();
            assert.strictEqual(val, false);
        });
        it('should return false when intialized with empty array', function () {
            const sc = scanner([]);
            const val = sc.hasNext();
            assert.strictEqual(val, false);
        });
        it('should return false when intialized with only whitespace', function () {
            const sc = scanner(' \r\n    \n  \n  \n  \r\n ');
            const val = sc.hasNext();
            assert.strictEqual(val, false);
        });
        it('should return true when intialized with leading whitespace', function () {
            const sc = scanner('\r\n   \n hello');
            const val = sc.hasNext();
            assert.strictEqual(val, true);
        });
        it('should return true when intialized with trailing whitespace', function () {
            const sc = scanner('hello \r\n');
            const val = sc.hasNext();
            assert.strictEqual(val, true);
        });
        it('should return true when intialized with separated strings (with non-whitespace characters) in an array', function () {
            const sc = scanner(['he', 'll', 'o ']);
            const val = sc.hasNext();
            assert.strictEqual(val, true);
        });
        it('should return true separated by \\r\\n', function () {
            const sc = scanner('hello\r\nworld');
            const val = sc.hasNext();
            assert.strictEqual(val, true);
        });
        it('should return true separated by \' \' (space)', function () {
            const sc = scanner('hello world');
            const val = sc.hasNext();
            assert.strictEqual(val, true);
        });
        it('should return same value if consecutive calls', function () {
            const sc = scanner('hello');
            const expected = sc.hasNext();
            const actual = sc.hasNext();
            assert.strictEqual(actual, expected);
        });
    });
});