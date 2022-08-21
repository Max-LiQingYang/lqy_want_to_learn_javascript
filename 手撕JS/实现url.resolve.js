// const url = require('url');
// url.resolve('/one/two/three', 'four');         // '/one/two/four'
// url.resolve('http://example.com/', '/one');    // 'http://example.com/one'
// url.resolve('http://example.com/one', '/two'); // 'http://example.com/two'

function resolve(from, to) {
  const resolvedUrl = new URL(to, new URL(from, "resolve://"));
  if (resolvedUrl.protocol === "resolve:") {
    const { pathname, search, hash } = resolvedUrl;
    return pathname + search + hash;
  }

  return resolvedUrl.toString();
}
console.log(
  resolve('www.baidu.com/one/two/three', 'four'),         // '/one/two/four'
  resolve('http://example.com/', '/one'),    // 'http://example.com/one'
  resolve('http://example.com/one', '/two')) // 'http://example.com/two'