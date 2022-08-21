// 保持继承链
function deepClone2 (origin) {
  let obj = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(obj), origin);
}