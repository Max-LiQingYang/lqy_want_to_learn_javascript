var obj = {
  address: ' guangzhou',
  company: '   CVTE',
  direction: {
    web: '  web',
    Android: 'Android',
    ios: ' ios'
  },
  abc: [{
    ai: ' a',
    bi: '  b',
    ci: '  c'
  }]
};

String.prototype.myTrim = function () {
  return this.replace(/^[\uFEFF\xA0\s]+|[\uFEFF\xA0\s]+$/g, '');
};

function iTrim(obj) {
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (typeof obj[i] === 'object') {
        iTrim(obj[i]);
      } else {
        obj[i] = obj[i].myTrim();
      }
    }
  }
}

console.log(obj);
iTrim(obj);
console.log(obj);