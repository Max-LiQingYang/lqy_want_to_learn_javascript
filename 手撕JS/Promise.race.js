Promise._race = promises => new Promise((resolve, reject) => {
  promises.forEach(item => {
      // resolve 是返回的 new Promise 的 resolve
      // 如果 resolve/catch 被调用了，那么就直接返回了
      Promise.resolve(item).then(resolve, reject);
  })  
})