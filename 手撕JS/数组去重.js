
function flat(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
  }

  function quchong(arr) {
    if (arr.length <= 1) return arr;
    let left = 1,
      right = 1;
    arr.sort((a, b) => a - b);
    while (right < arr.length) {
      if (arr[right] !== arr[right - 1]) {
        arr[left] = arr[right];
        left++;
      }
      right++;
    }
    arr = arr.splice(left);
  }

  quchong(arr);
  return arr;
}



const a = [1, 2, [4, 3, 6], [2, 45, [4, 5, 3, [6, 4, 7]]]];

console.log(flat(a));