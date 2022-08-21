class Node {
  constructor(id) {
    this.id = id;
    this.neighbors = new Set();
  }

  connect(node) {
    if (node !== this) {
      this.neighbors.add(node);
      node.neighbors.add(this);
    }
  }
}

class RandomGraph {
  constructor(size) {
    this.nodes = new Set();

    for (let i = 1; i < size; i++) {
      this.nodes.add(new Node(i));
    }

    const threshold = 1 / size;
    for (const x of this.nodes) {
      for (const y of this.nodes) {
        if (Math.random() < threshold) {
          x.connect(y);
        }
      }
    }
  }

  print() {
    for (let node of this.nodes) {
      const ids = [...node.neighbors].map((neighbor) => neighbor.id)
        .join(",");
      console.log(`${node.id}: ${ids}`);
    }
  }

  // 判断图是否连通
  isConnected () {
    const visitedNodes = new Set();

    function * traverse (nodes) {
      for (let node of nodes) {
        if (!visitedNodes.has(node)) {
          yield node;
          yield * traverse(node.neighbors);
        }
      }
    }

    const firstNode = this.nodes[Symbol.iterator]().next().value;
    for (const node of traverse([firstNode])) {
      visitedNodes.add(node);
    }
    return visitedNodes.size === this.nodes.size;
  }
}

const g = new RandomGraph(6);
g.print();

