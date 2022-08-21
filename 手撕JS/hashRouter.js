/*  
 * 调用 addRoute 添加一个路由
 * 调用 updateView 执行路由表中对应回调函数更新界面
*/

class Router {
  consturctor () {
    this.routes = {};
    this.currentUrl = "";
  }

  addRoute (path, callback) {
    this.routes[path] = callback || function () {};
  }

  updateView () {
    this.currentUrl = location.hash.slice(1) || "/";
    this.routes[this.currentUrl] && this.routes[this.currentUrl]();
  }

  init () {
    window.addEventListener("load", this.updateView.bind(this), false);
    window.addEventListener("hashchange", this.updateView.bind(this), false);
  }
}
