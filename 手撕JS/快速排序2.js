function quick_sort(arr, from, to) {
  var i = from; //哨兵i
  var j = to; //哨兵j
  var key = arr[from]; //标准值
  if (from >= to) { //如果数组只有一个元素
    return;
  }
  while (i < j) {
    while (arr[j] > key && i < j) {
      //从右边向左找第一个比key小的数，找到或者两个哨兵相碰，跳出循环
      // j 一定停在 <= key 的位置上
      j--;
    }
    while (arr[i] <= key && i < j) {
      // i 最大停在 j 的位置上
      //从左边向右找第一个比key大的数，找到或者两个哨兵相碰，跳出循环
      // 这里的=号保证在本轮循环结束前，key的位置不变，
      // 否则的话跳出循环，交换i和from的位置的时候，from位置的上元素有可能不是key
      i++;
    }
    /**
      代码执行道这里，
            1、两个哨兵到找到了目标值。
            2、j哨兵找到了目标值。
            3、两个哨兵都没找到(key是当前数组最小值)
    **/
    if (i < j) { //交换两个元素的位置
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;

    }
  }
  arr[from] = arr[i] //
  arr[i] = key;
  console.log(i);
  quick_sort(arr, from, i - 1);
  quick_sort(arr, i + 1, to);
}

const arr = [3, 5, 2, 6, 8, 5, 7]
quick_sort(arr, 0, 6)
console.log(arr);






// 2
function quick_sort(arr, from, to) {
  if (from >= to) return;

  const mid = Math.floor((from + to) / 2);

  if (arr[from] > arr[mid]) {
    swap(arr, from, mid);
  }
  if (arr[mid] > arr[to]) {
    swap(arr, mid, to);
  }
  if (arr[from] > arr[to]) {
    swap(arr, from, to);
  }
  swap(arr, mid, to - 1);

  const pivot = arr[to - 1];

  let i = from, j = to - 1;

  while (i < j) {
    while (arr[i] < pivot) {
      i++;
    }
    while (arr[j] >= pivot) {
      j--;
    }

    if (i < j) {
      swap(arr, i, j);
    }
  }

  swap(arr, i, to - 1);
  quick_sort(arr, from, i - 1);
  quick_sort(arr, i + 1, to);
}

function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
