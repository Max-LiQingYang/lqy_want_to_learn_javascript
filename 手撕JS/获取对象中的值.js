let obj = { a: { b: 1 } };

function getValue(obj, str, flag) {
  let arr = str.split(".");
  let res = obj;
  for (let i of arr) {
    res = res[i];
  }
  if (res !== undefined) {
    return res;
  } else {
    return flag;
  }
}


// getVakye (目标对象, 目标属性, 默认值)
console.log(getValue(obj, 'a.b', 0));