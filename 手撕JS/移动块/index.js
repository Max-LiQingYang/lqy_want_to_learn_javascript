var moveDiv = document.getElementById('moveDiv');
var outDiv = document.getElementById('outDiv');
var disTop;
var disLeft;
var outB, outL, outR, outT;
var moveL, moveT;

function mousedown(event) {
  // 鼠标按下时的鼠标位置
  disTop = event.clientY;
  disLeft = event.clientX;
  var movediv = moveDiv.getBoundingClientRect();
  var outdiv = outDiv.getBoundingClientRect();

  outT = outdiv.top;
  outL = outdiv.left;
  outR = outdiv.right;
  outB = outdiv.bottom;
  // 鼠标按下时移动块的位置
  moveT = movediv.top;
  moveL = movediv.left;

  moveDiv.addEventListener('mousemove', mousemove, false);
}

function mousemove() {
  // 鼠标移动时的实际左边框与上边位置
  var realTop = event.clientY - disTop + moveT;
  var realLeft = event.clientX - disLeft + moveL;


  // move块的四个边框
  if (realLeft <= outL || realTop <= outT || realTop + 200 >= outB || realLeft + 200 >= outR) {
    return;
  }

  moveDiv.style.left = realLeft + 'px';
  moveDiv.style.top = realTop + 'px';
}

function mouseup() {
  moveDiv.removeEventListener("mousemove", mousemove);
}

moveDiv.addEventListener('mousedown', mousedown, false);
outDiv.addEventListener('mouseup', mouseup, false);
