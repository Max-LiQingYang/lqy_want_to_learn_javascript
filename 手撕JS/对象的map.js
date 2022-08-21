Object.prototype.map = function (fn) {
  const obj = this;
  const result = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const res = fn(key, obj[key]);
      result[key] = res;
    }
  }
  return result;
}



// JSON.stringify 实现
Object.prototype.map = function (fn, oThis = null) {
  if (typeof fn !== "function") return new TypeError("不是函数");
  return JSON.parse(JSON.stringify(this, (key, value) => {
    if (key) {
      return fn.apply(oThis, key, value, this);
    } else {
      return value;
    }
  }))
}