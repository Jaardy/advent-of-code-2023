// @ts-nocheck
// import { commands, nodes } from "./example.mjs";
import { commands, nodes } from "./input.mjs";

class Node {
  static nodes = new Map();
  static steps = 0;
  static finalCount;
  static aNodes = new Map();
  static zNodes = new Map();

  constructor(node, left, right) {
    this.node = node;
    this.L = left;
    this.R = right;
    Node.nodes.set(node, this);
  }
  move(command) {
    Node.steps++;

    const nextNode = Node.nodes.get(this[command]);
    if (nextNode.node === "ZZZ") {
      Node.finalCount = Node.steps;
    }

    return nextNode;
  }
  static findStartNodes() {
    Node.nodes.forEach((node) => {
      if (node.node[2] === "A") {
        Node.aNodes.set(node.node, node);
      }
      if (node.node[2] === "Z") {
        Node.zNodes.set(node.node, node);
      }
    });
  }
}

nodes.forEach(([node, left, right]) => {
  new Node(node, left, right);
});

Node.findStartNodes();
console.log(Node.aNodes);
let currNode = Node.nodes.get("TVA");
while (!Node.finalCount) {
  for (const command of commands) {
    const nextNode = currNode.move(command);
    if (nextNode.node[2] === "Z") Node.finalCount = Node.steps;
    currNode = nextNode;
  }
}

console.log(Node.finalCount);

// 11309
//17621
//16043
//20777
//
