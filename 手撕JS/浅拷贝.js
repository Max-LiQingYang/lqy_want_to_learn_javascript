function shollowClone (obj) {
  const newObj = {};
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}