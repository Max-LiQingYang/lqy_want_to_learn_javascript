// Promise.prototype.finally = function (callback) {
//   const promise = this.constructor;
//   console.log(this);
//   console.log(promise);
//   return this.then(value => {
//     promise.resolve(callback().then(() => value));
//   }, reason => {
//     promise.resolve(callback().then(() => {
//       throw reason;
//     }))
//   })
// }

Promise.prototype.finally = function (onFinally) {
  return this.then(
    /* onFulfilled */
    res => Promise.resolve(onFinally()).then(() => res),
    /* onRejected */
    err => Promise.resolve(onFinally()).then(() => { throw err; })
  );
};

const p = new Promise(resolve => {
  console.log("start");
  setTimeout(function () {
    console.log("promise");
    resolve(1);
  }, 3000)
}).finally(function () {
  console.log("finally");
})