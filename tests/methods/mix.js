const { assert } = require('chai');
const scanner = require('../../scanner');

describe('Scanner', function () {
    describe('#next()', function () {
        describe('#hasNext()', function () {
            it('should return a string of elements joined together by a space', function () {
                const sc = scanner(['hel', 'lo', ' ', '\r\n', 'wo', 'r', 'ld ', '\n', 'fun', '  times']);
                let arr = [];
                while (sc.hasNext())
                    arr.push(sc.next());
                const val = arr.join(' ');
                assert.strictEqual(val, 'hello world fun times');
            });
            it('should return the initial corresponding element when consecutive calls of #hasNext()', function () {
                const sc = scanner('hello world');
                sc.hasNext();
                sc.hasNext();
                const val = sc.next();
                assert.strictEqual(val, 'hello');
            });
            it('should return false when reaches EOF (end-of-file)', function () {
                const sc = scanner('hello');
                sc.next(); // remove hello
                const val = sc.hasNext();
                assert.strictEqual(val, false);
            });
        });
        describe('#nextLine()', function () {
            it('should return an empty string when flushing the buffer', function () {
                const sc = scanner('hello\r\nworld');
                sc.next();
                const val = sc.nextLine();
                assert.strictEqual(val, '');
            });
            it('should return the next line after flushing the buffer', function () {
                const sc = scanner('hello\r\nworld fun times');
                sc.next(); // remove hello
                sc.nextLine(); // flush the buffer
                const val = sc.nextLine();
                assert.strictEqual(val, 'world fun times');
            });
        });
        describe('#hasNextLine()', function () {
            it('should return the first next element despite using #hasNextLine() prior', function () {
                const sc = scanner('hello world\r\nfun times');
                sc.hasNextLine();
                const val = sc.next();
                assert.strictEqual(val, 'hello');
            });
        });
    });
    describe('#nextNumber()', function () {
        describe('#hasNextNumber()', function () {
            it('should return the sum of numbers when initialized with numbers separated by whitespace', function () {
                const sc = scanner(['1', '0', ' \r', '\n', '1', ' 1\n']);
                let sum = 0;
                while (sc.hasNextNumber())
                    sum += sc.nextNumber();
                assert.strictEqual(sum, 12);
            });
            it('should return the initial corresponding number when consecutive calls of #hasNextNumber()', function () {
                const sc = scanner('1 10');
                sc.hasNextNumber();
                sc.hasNextNumber();
                const val = sc.nextNumber();
                assert.strictEqual(val, 1);
            });
            it('should return false when reaches EOF (end-of-file)', function () {
                const sc = scanner('1');
                sc.nextNumber(); // remove 1
                const val = sc.hasNextNumber();
                assert.strictEqual(val, false);
            });
        });
        describe('#nextLine()', function () {
            it('should return an empty string when flushing the buffer', function () {
                const sc = scanner('1\r\nhello');
                sc.nextNumber(); // remove 1
                const val = sc.nextLine();
                assert.strictEqual(val, '');
            });
            it('should return the next line after flushing the buffer', function () {
                const sc = scanner('1\r\nhello world');
                sc.nextNumber(); // remove 1
                sc.nextLine(); // flush the buffer
                const val = sc.nextLine();
                assert.strictEqual(val, 'hello world');
            });
        });
        describe('#hasNextLine()', function () {
            it('should return the first number despite using #hasNextLine() prior', function () {
                const sc = scanner('1 hello\r\n2 world');
                sc.hasNextLine();
                const val = sc.nextNumber();
                assert.strictEqual(val, 1);
            });
        });
    });
    describe('#nextLine()', function () {
        describe('#hasNextLine()', function () {
            it('should return a string of all lines joined together by a space', function () {
                const sc = scanner(['hel', 'lo', ' ', '\r\n', 'wo', 'r', 'ld ', '\n', 'fun', '  times']);
                let arr = [];
                while (sc.hasNextLine())
                    arr.push(sc.nextLine());
                const val = arr.join(' ');
                assert.strictEqual(val, 'hello  world  fun  times');
            });
            it('should return the initial corresponding line when consecutive calls of #hasNextLine()', function () {
                const sc = scanner('hello \r\nworld');
                sc.hasNextLine();
                sc.hasNextLine();
                const val = sc.nextLine();
                assert.strictEqual(val, 'hello ');
            });
            it('should return false when reaches EOF (end-of-file)', function () {
                const sc = scanner('hello\r\n');
                sc.nextLine(); // remove hello
                const val = sc.hasNextLine();
                assert.strictEqual(val, false);
            });
        });
        describe('#hasNext()', function () {
            it('should return the next line despite using #hasNext() prior', function () {
                const sc = scanner('hello world\r\nfun times');
                sc.hasNext();
                const val = sc.nextLine();
                assert.strictEqual(val, 'hello world');
            });
        });
        describe('#hasNextNumber()', function () {
            it('should return the next line despite using #hasNextNumber() prior', function () {
                const sc = scanner('1 hello\r\nworld');
                sc.hasNextNumber();
                const val = sc.nextLine();
                assert.strictEqual(val, '1 hello');
            });
        });
    });
});