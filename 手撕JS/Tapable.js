class SyncHook {
  constructor (args) {
    this.args = args;
    this.tasks = [];
  }

  tap (name, task) {
    this.tasks.push(task);
  }

  call (...args) {
    if (args.length < this.args.length) 
      throw new Error("参数不足");
    args = args.slice(0, this.args.length);
    this.tasks.forEach(task => {
      task(...args);
    });
  }
}

class SyncBailHook {
  constructor (args) {
    this.args = args;
    this.tasks = [];
  }

  tap (name, task) {
    this.tasks.push(task);
  }

  call (...args) {
    args = args.slice(0, this.args.length);
    let i = 0, ret;
    do {
      ret = this.tasks[i++](...args);
    } while (!ret)
  }
}

class SyncWaterHook {
  constructor (args) {
    this.args = args;
    this.tasks = [];
  }

  tap (name, task) {
    this.tasks.push(task);
  }

  call (...args) {
    args = args.slice(0, this.args.length);

    let [first, ...others] = this.tasks;
    return others.reduce((ret, task) => task(ret), first(...args));
  }
}

class SyncLoopHook {
  constructor (args) {
    this.args = args;
    this.tasks = [];
  }

  tap (name, task) {
    this.tasks.push(task);
  }

  call (...args) {
    args = args.slice(0, this.args.length);

    let [first, others] = this.tasks;
    let ret;
    for (let task of this.tasks) {
      do {
        ret = task(...args);
      } while (res !== undefined)
    }
  }
}

class AsyncParallelHook {
  constructor (args) {
    this.args = args;
    this.tasks = [];
  }

  tapAsync (nams, task) {
    this.tasks.push(task);
  }

  callAsync (...args) {
    let finalCallback = args.pop();

    args = args.slice(0, this.args.length);
    let i = 0;
    let done = () => {
      if (++i === this.args.length) {
        finalCallback();
      }
    }
    this.tasks.forEach(task => task(...args, done));
  }

  tapPromise (name, task) {
    this.tasks.push(task);
  }

  promise (...args) {
    args = args.slice(0, this.args.length);
    return Promise.all(this.tasks.map(task => task(...args)));
  }
}

class AsyncSeriesHook {
  constructor (args) {
    this.args = args;
    this.tasks = [];
  }

  tapAsync (nams, task) {
    this.tasks.push(task);
  }

  callAsync (...args) {
    let finalCallback = args.pop();

    args = args.slice(0, this.args.length);

    let i = 0;
    let next = () => {
      let task = this.task[i++]
      task ? task(...args, next) : finalCallback();
    }
    next();
  }

  tapPromise (name, task) {
    this.tasks.push(task);
  }

  promise (...args) {
    args = args.slice(0, this.args.length);

    let [first, ...others] = this.tasks;

    return others.reduce((promise, task) => {
      return promise.then(() => task(...args));
    }, first(...args));
  }
}









