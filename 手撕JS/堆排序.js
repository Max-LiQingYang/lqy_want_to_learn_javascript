function sort(arr) {
  // 初始化一个堆
  for (let i = parseInt(arr.length / 2) - 1; i >= 0; i--) {
    // i 是最后一个父节点
    adHeap(i, arr, arr.length);
  }

  // 弹出最大子节点
  for (let j = arr.length - 1; j > 0; j--) {
    // 将最大值放到最后
    swap(arr, 0, j);
    adHeap(0, arr, j);
  }
}

function adHeap(i, arr, length) {
  let temp = arr[i];
  for (var k = i * 2 + 1; k < length; k = k * 2 + 1) {
    //找到大的那个节点，然后赋值给父节点
    if (k + 1 < length && arr[k] < arr[k + 1]) {
      k++;
    }
    // k 是子节点
    if (arr[k] > temp) {
      arr[i] = arr[k];
      i = k;
    } else {
      break;
    }
  }
  //再用父节点的元素给补充到子节点上
  arr[i] = temp;
}

function swap(arr, i, j) {
  let empty = arr[i];
  arr[i] = arr[j];
  arr[j] = empty;
}


let arr = [4, 1, 2, 3, 5, 0, 9];
sort(arr);
console.log(arr);