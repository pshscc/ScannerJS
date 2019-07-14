const { assert } = require('chai');
const scanner = require('../../scanner');

describe('scanner()', function () {
    it('should throw TypeError when intialized with something not a string or an array', function () {
        assert.throws(() => scanner(1), TypeError);
    });
    it('should not throw a TypeError when initialized with a string', function () {
        assert.doesNotThrow(() => scanner(''), TypeError);
    });
    it('should not throw a TypeError when intialized with an array', function () {
        assert.doesNotThrow(() => scanner([]), TypeError);
    });
});