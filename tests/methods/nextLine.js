const { assert, expect } = require('chai');
const scanner = require('../../scanner');

describe('Scanner', function () {
    describe('#nextLine()', function () {
        it('should return empty string when intialized with empty string', function () {
            const sc = scanner('');
            const val = sc.nextLine();
            assert.strictEqual(val, null);
        });
        it('should return null when intialized with empty array', function () {
            const sc = scanner([]);
            const val = sc.nextLine();
            assert.strictEqual(val, null);
        });
        it('should return empty string when initialized with only new lines (\\r\\n)', function () {
            const sc = scanner('\r\n');
            const val = sc.nextLine();
            assert.strictEqual(val, '');
        });
        it('should return empty string when initialized with separated new lines (\\r\\n) in an array', function () {
            const sc = scanner(['\r', '\n']);
            const val = sc.nextLine();
            assert.strictEqual(val, '');
        });
        it('should return empty string when initialized with only new lines (\\n)', function () {
            const sc = scanner('\n');
            const val = sc.nextLine();
            assert.strictEqual(val, '');
        });
        it('should return empty string when initialized with separated new lines (\\n) in an array', function () {
            const sc = scanner(['\n', '\n']);
            const val = sc.nextLine();
            assert.strictEqual(val, '');
        });
        it('should return the rest of the buffer when there is no new line', function () {
            const sc = scanner('hello world');
            const val = sc.nextLine();
            assert.strictEqual(val, 'hello world');
        });
        it('should return the next line when separated by new lines', function () {
            const sc = scanner('hello\nworld');
            const val = sc.nextLine();
            assert.strictEqual(val, 'hello');
        });
        it('should return null when reaches EOF (end-of-file)', function () {
            const sc = scanner('hello\r\n');
            sc.nextLine(); // remove hello
            const val = sc.nextLine();
            assert.strictEqual(val, null);
        });
    });
});