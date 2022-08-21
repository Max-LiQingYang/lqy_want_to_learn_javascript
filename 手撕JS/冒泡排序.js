var sortArray = function (nums) {
  if (nums.length < 2) return nums;
  for (let i = nums.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
      }
    }
  }
  return nums;
}

console.log(sortArray([34, 5, 8, 6, 78, 465, 4, 34, 233]));