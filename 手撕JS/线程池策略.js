class TastWorker extends Worker {
  constructor (notifyAvailable, ...workerArgs) {
    super(...workerArgs);

    // 初始化不可用状态
    this.available = false;
    this.resolve = null;
    this.reject = null;

    // 线程池会传递回调
    // 以便工作者线程发出他需要新任务的信号
    this.noifytAvailable = notifyAvailable;

    // 线程脚本在完全初始化之后会发送一条 ready 消息
    this.onmessage = () => this.setAvailable();
  }

  // 由线程池调用, 以分配新任务
  dispatch ({ resolve, reject, postMessageArgs }) {
    this.available = false;

    this.onmessage = ({ data }) => {
      resolve(data);
      this.setAvailable();
    };

    this.onerror = (e) => {
      reject(e);
      this.setAvailable();
    };

    this.postMessage(...postMessageArgs);
  }

  setAvailable () {
    this.available = true;
    this.resolve = null;
    this.reject = null;
    this.notifyAvailable();
  }
}

class WorkerPool {
  constructor (poolSize, ...workerArgs) {
    this.taskQueue = [];
    this.workers = [];
  
    // 初始化线程
    for (let i = 0; i < poolSize; ++i) {
      this.workers.push(
        new TaskWorker(() => this.dispatchIfAvailable(), ...workerArgs)
      );
    }
  }

  // 把任务推入队列
  enqueue (...postMessageArgs) {
    return new Promise((resolve, reject) => {
      this.taskQueue.push({ resolve, reject, postMessageArgs });

      this.dispatchIfAvailable();
    });
  }

  // 把任务发送给下一个空闲的线程（如果有的话）
  dispatchIfAvailable () {
    if (!this.taskQueue.length) {
      return;
    }

    for (const worker of this.workers) {
      if (worker.available) {
        let a = this.taskQueue.shift();
        worker.dispatch(a);
        break;
      }
    }
  }

  close () {
    for (const worker of this.workers) {
      worker.terminate();
    }
  }
}
