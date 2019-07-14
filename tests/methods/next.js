const { assert } = require('chai');
const scanner = require('../../scanner');

describe('Scanner', function () {
    describe('#next()', function () {
        it('should return null when intialized with empty string', function () {
            const sc = scanner('');
            const val = sc.next();
            assert.strictEqual(val, null);
        });
        it('should return null when intialized with empty array', function () {
            const sc = scanner([]);
            const val = sc.next();
            assert.strictEqual(val, null);
        });
        it('should return null when intialized with only whitespace', function () {
            const sc = scanner(' \r\n    \n  \n  \n  \r\n ');
            const val = sc.next();
            assert.strictEqual(val, null);
        });
        it('should return next element when intialized with leading whitespace', function () {
            const sc = scanner('\r\n   \n hello');
            const val = sc.next();
            assert.strictEqual(val, 'hello');
        });
        it('should return next element when intialized with trailing whitespace', function () {
            const sc = scanner('hello \r\n');
            const val = sc.next();
            assert.strictEqual(val, 'hello');
        });
        it('should return next element when intialized with separated strings (with non-whitespace characters) in an array', function () {
            const sc = scanner(['he', 'll', 'o']);
            const val = sc.next();
            assert.strictEqual(val, 'hello');
        });
        it('should return next element separated by \\r\\n', function () {
            const sc = scanner('hello\r\nworld');
            const val = sc.next();
            assert.strictEqual(val, 'hello');
        });
        it('should return next element separated by \' \' (space)', function () {
            const sc = scanner('hello world');
            const val = sc.next();
            assert.strictEqual(val, 'hello');
        });
        it('should return null when reaches EOF (end-of-file)', function () {
            const sc = scanner('hello');
            sc.next(); // remove hello
            const val = sc.next();
            assert.strictEqual(val, null);
        });
    });
});