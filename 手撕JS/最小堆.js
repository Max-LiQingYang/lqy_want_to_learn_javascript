// 最小堆
class MinHeap {
  constructor() {
    this.heap = [];
  }

  getParentIndex(i) {
    return (i - 1) >> 1;
  }

  getLeftIndex(i) {
    return i * 2 + 1;
  }

  getRightIndex(i) {
    return i * 2 + 2;
  }

  swap(i1, i2) {
    const temp = this.heap[i1];
    this.heap[i1] = this.heap[i2];
    this.heap[i2] = temp;
  }

  // 插入操作， 将数据查到最底部，之后从下到上地进行堆排序
  insert(value) {
    this.heap.push(value);
    this.shiftUp(this.heap.length - 1);
  }

  shiftUp(index) {
    if (index === 0) { return; }
    const parentIndex = this.getParentIndex(index);
    if (this.heap[parentIndex] > this.heap[index]) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }
  // -----------------------------------------

  // 删除操作，将第0个数据弹出， 将最底部的数字赋给位置0， 
  // 然后从上到下地进行堆排序
  pop() {
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
    return this.heap[0];
  }

  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if (this.heap[leftIndex] < this.heap[index]) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if (this.heap[rightIndex] < this.heap[index]) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }
  // --------------------------------------------

  peek() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }
}