let blocked = false;

try {
  let wroxWin = window.open("url", "_blank");
  if (wroxWin === null) {
    blocked = true;
  }
} catch (err) {
  blocked = true;
}

if (blocked) {
  alert("弹窗被屏蔽了!");
}
