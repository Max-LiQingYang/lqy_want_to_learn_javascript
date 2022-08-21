function curry(fn, args) {
    var length = fn.length; // length 属性指明函数的形参个数 argument.length是函数被调用时实际传参的个数
    // console.log(length);
    args = args || [];
    return function () {
        // arguments 属性的值是最近一次该函数调用时传入的实参
        var newArgs = args.concat(Array.prototype.slice.call(arguments));
        console.log(newArgs);
        if (newArgs.length < length) {
            return curry.call(this, fn, newArgs);
        } else {
            return fn.apply(this, newArgs);
        }
    }
}


// 或者
function curry2(fn, currArgs) {
    return function () {
        let args = [].slice.call(arguments);

        // 首次调用时，若未提供最后一个参数currArgs，则不用进行args的拼接
        if (currArgs !== undefined) {
            args = currArgs.concat(args);
        }

        // 递归调用
        if (args.length < fn.length) {
            return curry2(fn, args);
        }

        // 递归出口
        return fn.apply(null, args);
    }
}
