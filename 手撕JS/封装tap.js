function tap (ele, callback) {
  let startTime = 0;
  let delayTime = 200;
  let isMove = false;

  ele.addEventListener("touchmove", function() {
    isMove = true;
  });

  ele.addEventListener("touchstart", function () {
    startTime = Date.now();
  });

  ele.addEventListener("touchend", function (e) {
    if (isMove || Date.now() - startTime >= delayTime) {
      return;
    } else {
      callback(e);
    }
  });
}

// 防止点击穿透
tap(ele, function () {
  setTimeout(function () {
    ele.style.display = "none";
  }, 300);
});

