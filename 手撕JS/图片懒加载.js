window.onload = function () {

  let imgs = document.querySelectorAll("img");

  // 获取到浏览器顶部的举例
  function getTop(e) {
    // offsetTop 为只读属性
    return e.offsetTop;
  }

  function lazyLoad(imgs) {
    // 可视区域高度
    let h = window.innerHeight,
      s = document.documentElement.scrollTop || document.body.scrollTop;

    for (let i = 0; i < imgs.length; i++) {
      // 图片距离顶部的距离大于可视区域和滚动区域之和时懒加载
      // 也就是图片不可见时
      if (h + s > getTop(imgs[i])) {
        // 图片加载时会有2秒空白， 所以使用 setTimeout 定时 2s
        setTimeout(function () {
          // 隐形加载图片或其他资源
          // 创建一个临时图片， 这个图片再内存中不会到页面上去。 实现隐形加载。
          let temp = new Image();
          temp.src = imgs[i].getAttribute("data-src");
          temp.onload = function () {
            imgs[i].src = imgs[i].getAttribute("data-src");
          }
        }, 2000);
      }
    }
  }


  lazyLoad(imgs);

  window.scroll = function () {
    lazyLoad(imgs)
  }
}