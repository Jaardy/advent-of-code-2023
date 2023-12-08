import { readFileSync } from "fs";
let path = new URL("./input.txt", import.meta.url);
let buffer = readFileSync(path);
let input = buffer.toString().split(/\n/);

function parseForValue(total, string) {
  let start = Number.parseInt(string.match(/\d/)[0]);
  let end = Number.parseInt(string.split("").reverse("").join("").match(/\d/));
  return (total += start * 10 + end);
}

console.log(input.reduce(parseForValue, 0));
