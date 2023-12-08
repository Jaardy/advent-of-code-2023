// @ts-nocheck
// import { commands, nodes } from "./example.mjs";
import { commands, nodes } from "./input.mjs";

class Node {
  static nodes = new Map();
  static steps = 0;
  static finalCount;
  static aNodes = new Map();

  constructor(node, left, right) {
    this.node = node;
    this.L = left;
    this.R = right;
    Node.nodes.set(node, this);
  }
  move(command) {
    return Node.nodes.get(this[command]);
  }

  static findStartNodes() {
    Node.nodes.forEach((node) => {
      if (node.node[2] === "A") {
        Node.aNodes.set(node.node, node);
      }
    });
  }
}

nodes.forEach(([node, left, right]) => {
  new Node(node, left, right);
});

Node.findStartNodes();

// let currNodes = [...Node.aNodes].map(([_, node]) => node);

while (true) {
  for (const command of commands) {
    const nextNodes = [];
    for (const node of currNodes) {
      nextNodes.push(node.move(command));
    }
    endsWithZ = nextNodes.every(({ node }) => node[2] === "Z");
    console.log(nextNodes);
    currNodes = [];
    currNodes = nextNodes;
    Node.steps++;
  }
  if (endsWithZ) break;
}

console.log(Node.steps);
console.log(new Set(nodes.map(([n]) => n)));
