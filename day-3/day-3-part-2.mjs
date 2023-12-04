// @ts-nocheck
import { readFileSync } from "fs";
const path = new URL("./input.txt", import.meta.url);
const buffer = readFileSync(path);
const input = buffer.toString().split(/\n/);
const partNumbers = input
  .map((row, rowIndex) =>
    [...row.matchAll(/[0-9]+/g)].map((number) => [
      number[0],
      number.index,
      +number[0].toString().length - 1 + number.index,
      rowIndex,
    ])
  )
  .flat();
const gearMap = {};

function getNumberIfSymbolAdjacent([num, startIndex, endIndex, rowIndex]) {
  //line above is startIndex - 11 to -10+endIndex+1
  for (let i = startIndex - 1; i <= endIndex + 1; i++) {
    if (input[rowIndex - 1] && input[rowIndex - 1][i] === "*") {
      gearMap[`r${rowIndex - 1}c${i}`] ??= [];
      gearMap[`r${rowIndex - 1}c${i}`].push(+num);
    }
    if (input[rowIndex + 1] && input[rowIndex + 1][i] === "*") {
      gearMap[`r${rowIndex + 1}c${i}`] ??= [];
      gearMap[`r${rowIndex + 1}c${i}`].push(+num);
    }
  }
  if (input[rowIndex][startIndex - 1] === "*") {
    gearMap[`r${rowIndex}c${startIndex - 1}`] ??= [];
    gearMap[`r${rowIndex}c${startIndex - 1}`].push(+num);
  }
  if (input[rowIndex][endIndex + 1] === "*") {
    gearMap[`r${rowIndex}c${endIndex + 1}`] ??= [];
    gearMap[`r${rowIndex}c${endIndex + 1}`].push(+num);
  }
}

partNumbers.forEach((numberData) => getNumberIfSymbolAdjacent(numberData));

console.log(
  Object.values(gearMap).reduce((acc, nums) => {
    if (nums.length === 2)
      return acc + nums.reduce((product, num) => product * num, 1);
    return acc;
  }, 0)
);
