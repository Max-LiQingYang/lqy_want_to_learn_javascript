function sleep(interval) {
  return new Promise(resolve => {
    setTimeout(resolve, interval);
  })
}



async function stepPrint(n) {
  for (let i = 0; i <= n; i++) {
    console.log(i);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

stepPrint(20)