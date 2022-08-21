function Parent3 () {
  this.name = 'parent3';
  this.play = [1, 2, 3];
}

Parent3.prototype.getName = function () {
  return this.name;
}
function Child3() {
  // 第二次调用 Parent3()
  Parent3.call(this);
  this.type = 'child3';
}

// 第一次调用 Parent3();
Child3.prototype = new Parent3();
Child3.prototype.constructor = Child3;
