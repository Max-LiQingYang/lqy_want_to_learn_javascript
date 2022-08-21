class Vue {
  constructor (options) {
    this.$el = options.el;
    this.$data = options.data;
    this.$options = options;

    new Observer(this.$data, this); // 响应式

    new Compiler(this.$el, this);
  }
}

class Observer {
  constructor (data, vm) {
    this.data = data;

    Object.keys(this.data).forEach(key => {
      this.defineReactive(vm, key, this.data[key]);
    })
  }

  defineReactive (vm, key, val) {
    const dep = new Dep();
    Object.defineProperty(vm, key, {
      configurable: true,
      enumerable: true,
      get () {
        if (Dep.target) {
          dep.addSub(Dep.target);
        }
        return val;
      },
      set (newValue) {
        if (val === newValue) return;
        val = newValue;
        dep.notify();
      }
    })
  }
}

class Dep {
  constructor () {
    this.subs = [];
  }
  addSub (sub) {
    this.subs.push(sub);
  }
  notify () {
    this.subs.forEach(sub => {
      sub.update();
    });
  }
}

class Watcher {
  constructor (node, name, vm) {
    this.node = node;
    this.name = name;
    this.vm = vm;
    Dep.target = this;
    this.update();
    Dep.target = null;
  }
  update () {
    if (this.node.nodeType === 3) {
      this.node.nodeValue = this.vm[this.name]
    }
    if (this.node.nodeType === 1) {
      this.node.value = this.vm[this.name]
    }
  }
}

const reg = /\{\{(.+)\}\}/;

class Compiler {
  constructor (el, vm) {
    this.el = document.querySelector(el);
    this.vm = vm;
    this.frag = this._createFragment();
    this.el.appendChild(this.frag);
  }

  _createFragment () {
    const frag = document.createDocumentFragment();
    let child;
    while (child = this.el.fristChild) {
      this._compile(child);
      frag.appendChild(child);
    }
    return frag;
  }

  _compile(node) {
    // 如果是元素节点
    if (node.nodeType === 1) {
      const attrs = node.attributes;
      if (node.hasOwnProperty("v-model")) {
        // 看看是与哪一个数据相关
        const name = attrs["v-model"].nodeValue;
        node.addEventListener("input", e => {
          // 将实例的 text 修改为最新值
          this.vm[name] = e.target.value;
        });
        // 将 data 的值赋给该 node
        node.value = this.vm[name];
        node.removeAttribute("v-model");
      }
    } else if (node.nodeType === 3) { // 如果是文本节点
      if (reg.test(node.nodeValue)) {
        // 获取到匹配的字符串
        const name = RegExp.$1.trim();

        // 不直接通过赋值的操作， 而是通过绑定一个订阅者
        new Watcher(node, name, this.vm);
      }
    }
  }
}