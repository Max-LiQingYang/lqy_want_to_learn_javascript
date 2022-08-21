function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function () {
      //value属性表示当前成员的值，done属性是一个布尔值，表示遍历是否结束。
      return nextIndex < array.length 
        ? { value: array[nextIndex++], done: false } 
        : { value: undefined, done: true };
    }
  };
}

// 或者
function Node(value) {
  this.value = value;
  this.next = null;
}

Node.prototype[Symbol.iterator] = function () {
  let current = this;

  return {
    next: function () {
      if (current) {
        let value = current.value;
        current = current.next;
        return {
          done: false,
          value: value
        }
      } else {
        return { done: true };
      }
    }
  }
}
var one = new Node(1);
var two = new Node(2);
var three = new Node(3);

one.next = two;
two.next = three;

for (var i of one) {
  console.log(i);
}
var x = makeIterator([1, 2, 3]);

console.log(x.next());
console.log(x.next());
console.log(x.next());
console.log(x.next());

