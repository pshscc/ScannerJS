const { assert } = require('chai');
const scanner = require('../../scanner');

describe('Scanner', function () {
    describe('#hasNextLine()', function () {
        it('should return false when intialized with empty string', function () {
            const sc = scanner('');
            const val = sc.hasNextLine();
            assert.strictEqual(val, false);
        });
        it('should return false when intialized with empty array', function () {
            const sc = scanner([]);
            const val = sc.hasNextLine();
            assert.strictEqual(val, false);
        });
        it('should return true when initialized with only new lines (\\r\\n)', function () {
            const sc = scanner('\r\n');
            const val = sc.hasNextLine();
            assert.strictEqual(val, true);
        });
        it('should return true when initialized with separated new lines (\\r\\n) in an array', function () {
            const sc = scanner(['\r', '\n']);
            const val = sc.hasNextLine();
            assert.strictEqual(val, true);
        });
        it('should return true when initialized with only new lines (\\n)', function () {
            const sc = scanner('\n');
            const val = sc.hasNextLine();
            assert.strictEqual(val, true);
        });
        it('should return true when initialized with separated new lines (\\n) in an array', function () {
            const sc = scanner(['\n', '\n']);
            const val = sc.hasNextLine();
            assert.strictEqual(val, true);
        });
        it('should return the rest of the buffer when there is no new line', function () {
            const sc = scanner('hello world');
            const val = sc.hasNextLine();
            assert.strictEqual(val, true);
        });
        it('should return true when separated by new lines', function () {
            const sc = scanner('hello\nworld');
            const val = sc.hasNextLine();
            assert.strictEqual(val, true);
        });
        it('should return same value if consecutive calls', function () {
            const sc = scanner('\n');
            const expected = sc.hasNextLine();
            const actual = sc.hasNextLine();
            assert.strictEqual(actual, expected);
        });
    });
});