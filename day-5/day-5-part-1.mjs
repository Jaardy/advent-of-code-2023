// @ts-nocheck
import { readFileSync } from "fs";
const path = new URL("./input.txt", import.meta.url);
const buffer = readFileSync(path);
const input = buffer
  .toString()
  .split(/\n\n/)
  .map((x2yMap) => x2yMap.split(":"))
  .map(([type, numbers]) => [
    type,
    numbers
      .split(/\n/)
      .filter((is) => is.length)
      .map((str) =>
        str
          .trim()
          .split(" ")
          .map((num) => Number.parseInt(num))
      ),
  ]);
const seeds = input.slice(0, 1).flat(3).slice(1);
const instructions = input.slice(1).map(([_, lines]) => lines);
const result = seeds
  .map((seed) => instructions.reduce(transformValue, seed))
  .sort((a, b) => a - b)[0];
console.log(result);

//value 81, [target = 0, source = 15, range = 37 ]
function convertToNext(value, [target, source, range]) {
  if (value >= source && value < source + range) {
    const delta = source - target;
    return value - delta;
  }
  return false;
}

function transformValue(newValue, rulesForRound) {
  let x = false;

  for (const line of rulesForRound) {
    x = convertToNext(newValue, line);
    if (x) break;
  }
  if (x === false) {
    x = newValue;
  }
  return x;
}

// console.log(convertToNext(81, [0, 15, 37]));
