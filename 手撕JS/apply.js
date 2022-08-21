Function.prototype.myApply = function (context, arr) {
  const obj = context || window;
  obj.fn = this;
  let result;
  if (arr.length !== 0) {
    result = obj.fn(...arr);
  } else {
    result = obj.fn();
  }
  delete obj.fn;
  return result;
}