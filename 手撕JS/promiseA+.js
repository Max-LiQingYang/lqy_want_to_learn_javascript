function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {  // 如果从onFulfilled中返回的x 就是promise2 就会导致循环引用报错
      return reject(new TypeError('循环引用'));
  }

  let called = false; // 避免多次调用
  // 如果x是一个promise对象 （该判断和下面 判断是不是thenable对象重复 所以可有可无）
  if (x instanceof Promise) { // 获得它的终值 继续resolve
      if (x.status === PENDING) { // 如果为等待态需等待直至 x 被执行或拒绝 并解析y值
          x.then(y => {
              resolvePromise(promise2, y, resolve, reject);
          }, reason => {
              reject(reason);
          });
      } else { // 如果 x 已经处于执行态/拒绝态(值已经被解析为普通值)，用相同的值执行传递下去 promise
          x.then(resolve, reject);
      }
      // 如果 x 为对象或者函数
  } else if (x != null && ((typeof x === 'object') || (typeof x === 'function'))) {
      try { // 是否是thenable对象（具有then方法的对象/函数）
          let then = x.then;
          if (typeof then === 'function') {
              then.call(x, y => {
                  if(called) return;
                  called = true;
                  resolvePromise(promise2, y, resolve, reject);
              }, reason => {
                  if(called) return;
                  called = true;
                  reject(reason);
              })
          } else { // 说明是一个普通对象/函数
              resolve(x);
          }
      } catch(e) {
          if(called) return;
          called = true;
          reject(e);
      }
  } else {
      resolve(x);
  }
}

/**
* [注册fulfilled状态/rejected状态对应的回调函数]
* @param  {function} onFulfilled fulfilled状态时 执行的函数
* @param  {function} onRejected  rejected状态时 执行的函数
* @return {function} newPromsie  返回一个新的promise对象
*/
Promise.prototype.then = function(onFulfilled, onRejected) {
  const that = this;
  let newPromise;
  // 处理参数默认值 保证参数后续能够继续执行
  onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : value => value;
  onRejected =
      typeof onRejected === "function" ? onRejected : reason => {
          throw reason;
      };

  // then里面的FULFILLED/REJECTED状态时 为什么要加setTimeout ?
  // 原因:
  // 其一 2.2.4规范 要确保 onFulfilled 和 onRejected 方法异步执行(且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行) 所以要在resolve里加上setTimeout
  // 其二 2.2.6规范 对于一个promise，它的then方法可以调用多次.（当在其他程序中多次调用同一个promise的then时 由于之前状态已经为FULFILLED/REJECTED状态，
  //               则会走的下面逻辑),所以要确保为FULFILLED/REJECTED状态后 也要异步执行onFulfilled/onRejected

  // 其二 2.2.6规范 也是resolve函数里加setTimeout的原因
  // 总之都是 让then方法异步执行 也就是确保onFulfilled/onRejected异步执行

  // 如下面这种情景 多次调用p1.then
  // p1.then((value) => { // 此时p1.status 由pedding状态 => fulfilled状态
  //     console.log(value); // resolve
  //     // console.log(p1.status); // fulfilled
  //     p1.then(value => { // 再次p1.then 这时已经为fulfilled状态 走的是fulfilled状态判断里的逻辑 所以我们也要确保判断里面onFuilled异步执行
  //         console.log(value); // 'resolve'
  //     });
  //     console.log('当前执行栈中同步代码');
  // })
  // console.log('全局执行栈中同步代码');
  //

  if (that.status === FULFILLED) { // 成功态
      return newPromise = new Promise((resolve, reject) => {
          setTimeout(() => {
              try{
                  let x = onFulfilled(that.value);
                  resolvePromise(newPromise, x, resolve, reject); // 新的promise resolve 上一个onFulfilled的返回值
              } catch(e) {
                  reject(e); // 捕获前面onFulfilled中抛出的异常 then(onFulfilled, onRejected);
              }
          });
      })
  }

  if (that.status === REJECTED) { // 失败态
      return newPromise = new Promise((resolve, reject) => {
          setTimeout(() => {
              try {
                  let x = onRejected(that.reason);
                  resolvePromise(newPromise, x, resolve, reject);
              } catch(e) {
                  reject(e);
              }
          });
      });
  }

  if (that.status === PENDING) { // 等待态
      // 当异步调用resolve/rejected时 将onFulfilled/onRejected收集暂存到集合中
      return newPromise = new Promise((resolve, reject) => {
          that.onFulfilledCallbacks.push((value) => {
              try {
                  let x = onFulfilled(value);
                  resolvePromise(newPromise, x, resolve, reject);
              } catch(e) {
                  reject(e);
              }
          });
          that.onRejectedCallbacks.push((reason) => {
              try {
                  let x = onRejected(reason);
                  resolvePromise(newPromise, x, resolve, reject);
              } catch(e) {
                  reject(e);
              }
          });
      });
  }
};