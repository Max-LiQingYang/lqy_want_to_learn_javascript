function myReverse(str) {
  let newArr = str.split(" ");
  let res = [];
  for (let i of newArr) {
    res.unshift(i + " ");
  }
  return res.join("");



  function reverse(item) {
    if (item instanceof Array) {
      let left = 0, right = item.length - 1;
      while (left < right) {
        [item[left], item[right]] = [item[right], item[left]];
        left++;
        right--;
      }
    } else if (typeof item === "string") {
      let arr = item.split("");
      console.log(arr);
      let newStr = reverse(arr);
      item = newStr.join("");
    }
    return item;
  }
}
console.log(myReverse("asdf fsd wer"));
