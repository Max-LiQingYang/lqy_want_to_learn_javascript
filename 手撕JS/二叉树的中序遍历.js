function inorderTraversal(root, res = []) {
  const stack = [];
  stack.push(root);
  while (stack.length) {
    const node = stack.pop();
    if (!node) {
      res.push(stack.pop());
      continue;
    }
    if (node.right) stack.push(node.right);
    stack.push(node);
    stack.push(null);
    if (node.left) stack.push(node.left);
  }
  return res;
}

// 2
function inorderTraversal (root) {
  const stack = [];
  while (stack.length || root) {
    while (root) {
      stack.push(root);
      root = root.left;
    }

    root = stack.pop();
    // 处理中间节点

    root = root.right;
  }
  return;
}