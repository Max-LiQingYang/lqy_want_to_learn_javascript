function isEquel(obj1, obj2) {
  if (!(obj1 instanceof Object) || !(obj2 instanceof Object))
    return obj1 === obj2;
  if (Object.keys(obj1).length !== Object.keys(obj2).length)
    return false;

  for (let key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if (!obj2.hasOwnProperty(key)) return false;
      if (!isEquel(obj1[key], obj2[key])) {
        return false;
      }
    }
  }
  return true;
}




const obj1 = {
  "a": 1,
  "b": {
    "c": undefined
  }
}
const obj2 = {
  "a": 1,
  "b": {
    "c": undefined
  }
}
console.log(isEquel(obj1, obj2));