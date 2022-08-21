const getJSON = function (url) {
  return new Promise((resolve, reject) => {
    const handle = function () {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 300) {
          resolve(this.response);
        } else {
          reject(new Error(this.statusText));
        }
      }
    }
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handle;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();
  });
}