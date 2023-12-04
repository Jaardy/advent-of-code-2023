// @ts-nocheck
import { readFileSync } from "fs";
let path = new URL("./input.txt", import.meta.url);
let buffer = readFileSync(path);
let input = buffer
  .toString()
  .split(/\n/)
  .map((card) => card.split(":"))
  .map(([cardId, results]) => [
    cardId.match(/\d+/)[0],
    results.split("|").map((results) =>
      results
        .split(" ")
        .filter((is) => is)
        .map((num) => Number.parseInt(num))
        .sort((a, b) => a - b)
    ),
  ]);

function totalCardValues(total, [cardId, [winningNums, drawNums]]) {
  const cardTotal =
    2 ** (winningNums.filter((num) => drawNums.includes(num)).length - 1);
  return Math.floor(cardTotal) + total;
}

const totalPoints = input.reduce(totalCardValues, 0);
console.log(totalPoints);
