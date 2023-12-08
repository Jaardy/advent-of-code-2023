import { readFileSync } from "fs";
const path = new URL("./input.txt", import.meta.url);
const buffer = readFileSync(path);
const input = buffer.toString().split(/\n\n/);

export const commands = input[0].split("");

export const nodes = input[1]
  .split(/\n/)
  .map((node) => [...node.matchAll(/\w+/g)])
  .map(([node, left, right]) => [node[0], left[0], right[0]]);
