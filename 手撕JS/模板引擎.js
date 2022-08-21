function render(template, data) {
  const reg = /\{\{\s*(\w+)\s*\}\}/;
  if (reg.test(template)) {
    const name = reg.exec(template)[1];
    template = template.replace(reg, data[name]);
    return render(template, data);
  }
  return template;
}

console.log(render("asdfasdf{{ a }}asdfasdf{{ b }}", { "a": 2, "b": 3 }));
