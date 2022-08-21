function myInstanceof(left, right) {
  if (typeof left !== "object" || left === "null") return false;
  let proto = Object.getPrototypeOf(left);
  while (proto) {
    if (right.prototype === proto) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}