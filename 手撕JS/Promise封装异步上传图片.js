function loadImageAsync (url) {
  return new Promise(function (resolve, reject) {
    let image = new Image();
    image.onload = function () {
      resolve(image);
    };

    image.onerror = function () {
      reject(new Error("加载失败" + url))
    };
    image.src = url;
  })
}