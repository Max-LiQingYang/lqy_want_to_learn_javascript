const Thunk = function (fn) {
  return function (...args) {
    return function (callback) {
      return fn.call(this, ...args, callback);
    }
  }
}

// fn(...args, callback); 自动执行 Generator 函数, 先传入参数, 再传入回调函数


function run (fn) {
  let gen = fn();

  function next (err, data) {
    let result;
    try {
      result = gen.next(data);
    } catch (err) {
      throw new Error(err);
    }
    if (result.done) return;
    result.value(next);   // result.value 是一个 thunk 函数, 里面已经有了参数, 只需要传回调函数--next
  }

  next();
}

run(generatorFun);
