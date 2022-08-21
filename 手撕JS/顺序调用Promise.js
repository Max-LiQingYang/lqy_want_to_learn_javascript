// 方法一： reduce
// const arr = [promise1, promise2, ...];
function sequencePromise(arr) {
  let first = arr.shift();
  return arr.reduce((promiseChain, promise) => {
    Promise.resolve(promiseChain).then(Promise.resolve(promise));
  }, Promise.resolve(first))
}

// 使用递归
function sequencePromise3(arr) {
  const promise = arr.shift();
  if (promise) {
    promise.then(() =>
      sequencePromise3(arr)
    )
  }
}
