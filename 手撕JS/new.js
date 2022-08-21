function myNew (fn, ...args) {
  const obj = {};
  obj.__proto__ = fn.prototype;
  const res = fn.apply(obj, args);
  
  return res instanceof Object ? res : obj;
}