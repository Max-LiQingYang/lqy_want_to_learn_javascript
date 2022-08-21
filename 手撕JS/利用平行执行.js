function randomDelay(id) {
  const delay = Math.random() * 1000;
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`${id} delay`);
      resolve();
    }, delay);
  });
}

// 保证执行顺序
async function foo() {
  const t0 = Date.now();
  for (let i = 0; i < 4; i++) {
    await randomDelay(i);
  }
  console.log(`${Date.now() - t0} compelete`);
}

// 并行执行， 不保证顺序
async function foo2() {
  const t0 = Date.now();
  const promises = Array(5).fill(null).map((value, index) => randomDelay(index));
  for (const p of promises) {
    await p;
  }
  console.log(`${Date.now() - t0} compelete`);
}

foo();