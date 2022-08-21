class Human {
  constructor(name) {
    this.name = name;
    this.sayHello();
    this.queue = Promise.resolve();
  }

  sayHello() {
    console.log(`${this.name}, 你好啊!`)
  }

  sleep(time) {
    this.queue = this.queue.then(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("Sleep " + time);
          resolve();
        }, time * 1000);
      });
    });
    return this;
  }

  eat(time) {
    this.queue = this.queue.then(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log("eat" + time);
          resolve();
        }, time * 1000)
      })
    });
    return this;
  }
}

let li = new Human("liqingyahg");
li.eat(2).sleep(2)