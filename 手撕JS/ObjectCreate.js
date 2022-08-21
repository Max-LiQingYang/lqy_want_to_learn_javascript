function create (proto) {
  const F = function () {};
  F.prototype = proto;
  F.prototype.constructor = F;
  return new F();
}