export default function throttled (fun, delay) {
  let oldTime = Date.now();
  return function (...args) {
    const curTime = Date.now();
    if (curTime - oldTime > delay) {
      oldTime = curTime;
      return fun.apply(this, args);
    }
  }
}