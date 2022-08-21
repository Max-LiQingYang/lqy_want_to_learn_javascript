Function.prototype.before = function (beforeFn) {
  let context = this;
  return function () {
    beforeFn.apply(context, arguments);
    return context.apply(this, arguments);
  }
}

Function.prototype.after = function (afterFn) {
  let _self = this;
  return function () {
    let ret = _self.apply(this, arguments);
    afterFn.apply(this, arguments);
    return ret;
  }
}

