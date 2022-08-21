function bucketSort(arr) {
  // 桶数 = (max - min) / 数组长度 + 1
  // 元素属于哪个桶 = (元素大小 - min) / 数组长度

  // 初始化桶
  // 计算最大值与最小值
  let result = []
  let minValue = arr[0]
  let maxValue = arr[0]
  // 找出最大值和最小值，为给每个桶分配大小做准备
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < minValue) {
      minValue = arr[i]
    }
    if (arr[i] > maxValue) {
      maxValue = arr[i]
    }
  }
  // 求得每个桶的size
  let bucketCount = Math.floor((maxValue - minValue) / arr.length) + 1
  let bucket = new Array(bucketCount)
  for (let i = 0; i < bucketCount; i++) {
    bucket[i] = []
  }
  // 往桶里放数据
  for (let i = 0; i < arr.length; i++) {
    bucket[Math.floor((arr[i] - minValue) / arr.length)].push(arr[i])
  }
  // 对每个桶进行单独排序，放进结果数组中
  for (let i = 0; i < bucketCount; i++) {
    bucket[i].sort()
    for (let j = 0; j < bucket[i].length; j++) {
      result.push(bucket[i][j])
    }
  }
  return result
}

console.log(bucketSort([0, 5, 4, 3, 20, 1, 2, 6, 4, 7, 6]));