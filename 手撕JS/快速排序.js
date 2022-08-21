// [9 39 7 9 10 78 3] 进行升序排序

var sortArray = function(nums) {
  if (nums.length <= 1) return nums;
  let pivotIndex = Math.floor(nums.length / 2);
  let mid = nums.splice(pivotIndex, 1)[0];
  let left = [], right = [];

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < mid) left.push(nums[i]);
    else right.push(nums[i]);
  }

  return sortArray(left).concat([mid], sortArray(right));
};