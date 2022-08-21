Array.prototype.myJoin = function (x) {
  let arr = Array.prototype.slice.call(this);   // arr = this[0];
  let newString = "";
  for (let i of arr) {
    newString += i + x;
  }
  return newString;
}
console.log([1, 45, "zx"].myJoin("?"));

