Function.prototype.myBind = function (context, ...args1) {
  if (typeof this !== "function") throw new TypeError("类型错误");
  let fn = this;

  return function F(...args2) {
    return fn.apply(
      this instanceof F
        ? new fn(...args2)
        : context,
      args1.concat(args2));
  }
}


var myModule = {
  num: 1,
  getNum: function () {
    console.log(this.num);
  }
}
myModule.getNum();

var otherModule = {
  num: 2
}
myModule.getNum.myBind(otherModule)();


var getNum = myModule.getNum;
getNum();
global.num = 3;
getNum();