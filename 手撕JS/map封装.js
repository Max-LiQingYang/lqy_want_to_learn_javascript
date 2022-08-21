Array.prototype.myMap = function (fn, context) {
  let arr = [].slice.call(this);

  let arrMap = [];

  for (let i = 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i)) {
      continue;
    }
    arrMap.push(fn.call(context, arr[i], i, this));
  }

  return arrMap;
}



console.log([1, 2, 3, 4, 5].myMap((i) => i * 2));
console.log([1, 2, 3].hasOwnProperty(0));