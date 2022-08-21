var token = result.data.token;

const iframe = document.createElement("iframe");
iframe.src = "url";
document.body.appendChild(iframe);
setTimeout(function () {
  iframe.contentWindow.postMessage(token, "url");
}, 4000);
setTimeout(function () {
  iframe.remove()
}, 6000);


window.addEventListener("message", function (event) {
  localStorage.setItem("token", event.data);
})