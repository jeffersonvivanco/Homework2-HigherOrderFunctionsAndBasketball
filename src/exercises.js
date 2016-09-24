/**
 * Created by jeffersonvivanco on 9/21/16.
 */

var functions = {
    sum : function (num1, num2, num3) {
        var total = 0;
        for(var i=0; i<arguments.length; i++){
            total = total + arguments[i];
        }
        return total;
    },
    repeatCall : function (fn, n, arg) {
        for(var i=0; i<n; i++){
            fn(arguments[2]);
        }
    },
    repeatCallAllArgs : function (fn, n, args) {
        var array = Array.prototype.slice.call(arguments, 2);
        for(var i=0; i<n; i++){
            fn.apply(this,array);
        }
    },
    makePropertyChecker : function (prop) {
        return function(obj){
            return obj.hasOwnProperty(prop);
        }
    },
    constrainDecorator : function (fn, min, max) {
        return function(){
            if(fn.apply(this, arguments) < min){
                return min;
            }
            else if(fn.apply(this, arguments)>max){
                return max;
            }
            else{
                return fn.apply(this, arguments);
            }
        }

    },
    limitCallsDecorator : function(fn, n){
        var numOfTimesCalled = 0;
        return function(){
            if(numOfTimesCalled < n){
                numOfTimesCalled++;
                return fn.apply(this, arguments);
            }
            else
                return undefined;
        }
    }
};



module.exports = functions;