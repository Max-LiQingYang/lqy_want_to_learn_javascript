function ajax (options) {
  const xhr = new XMLHttpRequest();
  options = options || {};
  const url = options.url || "";
  const type =  options.dataType || "json";
  const method = (options.method || "GET").toUpperCase();
  const params = options.data;

  if (method === "GET") {
    xhr.open(method, url + "?" + params, type);
    xhr.send();
  } else if (method === "POST") {
    xhr.open(method, url, type);
    xhr.send(params);
  }

  xhr.onreadystatechange = function (e) {
    if (xhr.readystate === 4) {
      if (xhr.status >= 200 && xhr.status <= 300) {
        options.success && options.success(xhr.responseText, xhr.response);
      } else {
        options.fail && options.fail(xhr.status);
      }
    }
  }
}