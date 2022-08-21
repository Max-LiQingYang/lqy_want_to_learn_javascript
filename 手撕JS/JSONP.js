// 实现一个 JSONP

// 检查用户名输入框中用户输入的用户名是否正确
const input = document.querySelector("input");
const p = document.querySelector("p");

// 声明 handle 
const handle = function (data) {
  input.style.border = "solid black 1px";
  input.innerHTML = data.msg;
}

input.onblur = function () {
  let username = this.value;

  const script = document.createElement("script");
  script.src = "url/x?callback=handle";
  document.body.appendChild(script);
}



app.all("/user-name", (request, response) => {
  const data = {
    mas: "用户已存在"
  };
  let str = JSON.stringify(data);
  const fun = request.split("=")[1];
  response.send(`${fun}(${str})`);
})