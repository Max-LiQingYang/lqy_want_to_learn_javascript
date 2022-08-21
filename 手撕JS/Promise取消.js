class CancelToken {
  constructor(cancelFn, id) {
    this.cancelFn = cancelFn;
    this.id = id;
  }
  promise() {
    return new Promise((resolve, reject) => {
      this.cancelFn(() => {
        setTimeout(console.log, 0, "取消");
        resolve();
      });
    }).then(() => clearTimeout(this.id));
  }
}

let cancelToken = null;

function cancellableDelayedResolve(delay) {
  setTimeout(console.log, 0, "设置延迟");

  return new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      setTimeout(console.log, 0, "延迟解决");
      resolve();
    }, delay);

    cancelToken = new CancelToken((cancelCallback) => {
      cancelCallback();
    }, id);
  });
}

cancellableDelayedResolve(2000);
cancelToken.promise();



