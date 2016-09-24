/**
 * Created by jeffersonvivanco on 9/21/16.
 */
/* jshint expr: true, maxlen: false */
var chai = require('chai');
var expect = chai.expect;
require('mocha-sinon');

// questionable at best
Object.assign(global, require('../src/exercises.js'));

// use to test console output while still allowing console.log
// to _actually_ output to screen
// source: http://stackoverflow.com/a/30626035
function mockConsoleOutput() {
    var log = console.log;
    this.sinon.stub(console, 'log', function() {
        return log.apply(log, arguments);
    });
}

describe('sum', function() {

    it('returns the sum of all arguments passed in', function() {
        expect(sum(1, 2, 3)).to.equal(6);
        expect(sum(1, 1, 1, 1, 1, 1, 1, 1, 1, 1)).to.equal(10);
        expect(sum(1)).to.equal(1);
    });
    it('returns 0 if there are no arguments passed in', function() {
        expect(sum()).to.equal(0);
    });
});
//
// describe('repeatCall', function() {
//
//     beforeEach(mockConsoleOutput);
//
//     it('calls function n times', function() {
//         var n = 2;
//         repeatCall(console.log, n, "Hello!");
//         expect(console.log.callCount).to.equal(n);
//         expect(console.log.alwaysCalledWithExactly('Hello!')).to.be.true;
//     });
// });
//
// describe('repeatCallAllArgs', function() {
//
//     beforeEach(mockConsoleOutput);
//
//     it('calls function n times, allows arbitrary number of arguments', function() {
//         var n = 2;
//         repeatCallAllArgs(console.log, n, "foo", "bar", "baz", "qux", "quxx", "corge");
//         expect(console.log.callCount).to.equal(n);
//         expect(console.log.alwaysCalledWithExactly('foo','bar', 'baz', 'qux', 'quxx', 'corge')).to.be.true;
//     });
// });
//
// describe('makePropertyChecker ', function() {
//     it('returns a function that checks for an object for a specific property', function() {
//         var duck = {
//             quack: function(){
//                 console.log('quack');
//             }
//         };
//         var notADuck = {};
//         var duckling = Object.create(duck);
//
//
//         var canQuack = makePropertyChecker('quack');
//         expect(canQuack(duck)).to.be.true;
//         expect(canQuack(notADuck)).to.be.false;
//         expect(canQuack(duckling)).to.be.false;
//     });
// });
// describe('constrainDecorator', function() {
//
//     it('returns a function that calls the original function ... and allows the return value of the original function to be returned without modification if it is between (inclusive) min and max', function() {
//         var constrainedParseInt = constrainDecorator(parseInt, -10, 10);
//         expect(constrainedParseInt("7")).to.equal(7);
//         expect(constrainedParseInt("-10")).to.equal(-10);
//         expect(constrainedParseInt("10")).to.equal(10);
//         expect(constrainedParseInt("0")).to.equal(0);
//     });
//
//     it('returns a function that calls the original function ... and when either max or min are not present or undefined, the new function will just give back the return value of the old function, without any constraints', function() {
//         var constrainedParseInt = constrainDecorator(parseInt);
//         expect(constrainedParseInt("-12")).to.equal(-12);
//         expect(constrainedParseInt("12")).to.equal(12);
//     });
//
//     it('returns a function that sets the return value of the original function to min if return value of original is less than min', function() {
//         var constrainedParseInt = constrainDecorator(parseInt, -10, 10);
//         expect(constrainedParseInt("-12")).to.equal(-10);
//     });
//
//     it('returns a function that sets the return value of the original function to max if return value of original is less than max', function() {
//         var constrainedParseInt = constrainDecorator(parseInt, -10, 10);
//         expect(constrainedParseInt("12")).to.equal(10);
//     });
// });
//
// describe('limitCallsDecorator', function() {
//
//     beforeEach(mockConsoleOutput);
//
//     it('decorates a function so that it can only be called a specified number of times', function() {
//         var n = 3;
//         limitedParseInt = limitCallsDecorator(parseInt, 3);
//         expect(limitedParseInt("423")).to.equal(423);
//         expect(limitedParseInt("423")).to.equal(423);
//         expect(limitedParseInt("423")).to.equal(423);
//         expect(limitedParseInt("423")).to.be.undefined;
//         console.log(limitedParseInt("423"));
//     });
// });
