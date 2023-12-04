// @ts-nocheck
import { readFileSync } from "fs";
let path = new URL("./input.txt", import.meta.url);
let buffer = readFileSync(path);
let input = buffer.toString().split(/\n/);
let partNumbers = input.map((row, rowIndex) =>
  [...row.matchAll(/[0-9]+/g)].map((number) => [
    number[0],
    number.index,
    +number[0].toString().length - 1 + number.index,
    rowIndex
  ])
).flat()
function getNumberIfSymbolAdjacent([num, startIndex, endIndex, rowIndex]) {
  const borderValues = []
  //line above is startIndex - 11 to -10+endIndex+1
  for (let i = startIndex - 1; i <= endIndex + 1; i++) {
    if (input[rowIndex-1]) {
        borderValues.push(input[rowIndex-1][i])
    }
    if (input[rowIndex+1]) {
        borderValues.push(input[rowIndex+1][i])
    }

  }
  if (input[rowIndex][startIndex-1]) borderValues.push(input[rowIndex][startIndex-1])
  if (input[rowIndex][endIndex+1]) borderValues.push(input[rowIndex][endIndex+1])

  return (!borderValues.filter(v => v).every(value => value === "." || value.match(/\d+/))) ? +num : 0
}

console.log(partNumbers.map(numberData => getNumberIfSymbolAdjacent(numberData)).reduce((total,value) => total+value,0))

console.log(input.map(row => [...row.matchAll(/\d+/g)]))
