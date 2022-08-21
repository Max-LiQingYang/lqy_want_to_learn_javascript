function clone (parent, child) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
}

function Parent() {
  this.name = 'parent6';
  this.play = [1, 2, 3];
}
Parent.prototype.getName = function () {
  return this.name;
}

function Child () {
  Parent.call(this);
  this.friend = "child5";
}

clone(Parent, Child);

let person = new Child();
