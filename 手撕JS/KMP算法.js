// 查询是否包含字串, 如果包含则返回索引, 不包含返回-1
let strStr = function (hayStack, needle) {
  if (needle.length === 0) return 0;

  const getNext = needle => {
    const next = [];
    let j = 0;
    next.push(j);

    for (let i = 1; i < needle.length; i++) {
      while (j > 0 && needle[j] !== needle[i]) {
        j = next[j - 1];
      }

      if (needle[i] === needle[j]) {
        j++;
      }
      next.push(j);
    }
    return next;
  }

  const next = getNext(needle);
  let j = 0;
  for (let i = 0; i < hayStack.length; i++) {
    while (j > 0 && hayStack[i] !== needle[j]) {
      j = next[j - 1];
    }

    if (hayStack[i] === needle[j]) j++;
    if (j === needle.length) return (i - needle.length + 1);
  }
  return -1;
}


