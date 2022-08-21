function equal(x, ...rest) {
  return Object.is(x, rest[0]) && 
    (rest.length < 2 || equal(...rest));
}
