function flattenDeep(arr) {
  let res = [];
  let toArr = function (arr) {
    arr.forEach(item => {
      if (Array.isArray(item)) toArr(item);
      else {
        res.push(cloneDeep(item));
      }
    })
  }
  toArr(arr);
  return res;
}


function cloneDeep(obj, hash = new WeakMap()) {
  if (obj === null) return obj;
  else if (obj instanceof Date) return new Date(obj);
  else if (obj instanceof RegExp) return new RegExp(obj);
  else if (typeof obj !== "object") return obj;
  else if (hash.has(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor();
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = cloneDeep(obj[key], hash);
    }
  }
  return cloneObj;
}

const a = [1, 2, [4, 3, 6], [2, 45, [4, 5, 3, [6, 4, 7]]], { "xixi": 1 }];
console.log(flattenDeep(a));
// flat(a);