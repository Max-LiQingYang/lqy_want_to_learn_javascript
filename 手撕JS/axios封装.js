class Axios {
  constructor () {

  }

  request (config) {
    return new Promise (resolve => {
      const { url = "", method = "GET", data = {} } = config;
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.onload = function () {
        resolve(xhr.responseText);
      }
      xhr.send(data);
    })
  }
}

function CreateAxiosFn () {
  let axios = new Axios();
  let req = axios.request.bind(axios);
  return req;
}

let axios = CreateAxiosFn();