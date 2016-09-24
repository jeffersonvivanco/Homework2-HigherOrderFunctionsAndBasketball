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
    repeatCall : function () {
        
    }
}
module.exports = functions;