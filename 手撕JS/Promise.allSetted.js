function allSetted (promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve([]);
      return;
    }

    const allResult = new Array(promises.length);
    let count = 0;

    for (let index = 0; index < promises.length; index++) {
      promises[index].then(
        result => {
          addResult(index, {
            status: "fulfilled",
            result
          })
        },
        reason => {
          addResult(index, {
            status: "rejected",
            reason
          });
        }
      )
    }

    function addResult (index, res) {
      allResult[index] = res;
      count++;
      if (count === promises.length - 1) {
        resolve(allResult);
        return;
      }
    }
  })
}