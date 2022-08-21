// 使用闭包
const count = function () {
  let i = 0;
  let timer;
  return function change(target) {
    i++;
    console.log(i);
    if (i === target) {
      clearTimeout(timer);
      return false;
    }
    timer = setTimeout(() => {
      change(target);
    }, 1000);
  }
}();

count(50);


// Promise实现
async function steoPrint (n) {
  for (let i = 0; i < n; i++) {
    console.log(i);
    await new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
}