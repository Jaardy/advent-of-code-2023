// @ts-nocheck
import { readFileSync } from "fs";
let path = new URL("./input.txt", import.meta.url);
let buffer = readFileSync(path);
let input = buffer
  .toString()
  .split(/\n/)
  .map((card) => card.split(":"))
  .map(([cardId, results]) => [
    Number.parseInt(cardId.match(/\d+/)[0]),
    results.split("|").map((results) =>
      results
        .split(" ")
        .filter((is) => is)
        .map((num) => Number.parseInt(num))
        .sort((a, b) => a - b)
    ),
  ]);

function totalCardValues(cardMap, [cardId, [winningNums, drawNums]]) {
  const matches = winningNums.filter((num) => drawNums.includes(num)).length;
  const points = Math.floor(2 ** (matches - 1));
  cardMap[cardId] ??= { matches: 0, points: 0, cardsHeld: 1 };
  for (let i = cardId + 1; i <= cardId + matches; i++) {
    cardMap[i] ??= { matches: 0, points: 0, cardsHeld: 1 };
    cardMap[i].cardsHeld += cardMap[cardId].cardsHeld;
  }
  cardMap[cardId] = { ...cardMap[cardId], points, matches };
  return cardMap;
}

const totalCards = Object.values(input.reduce(totalCardValues, {})).reduce(
  (total, { cardsHeld }) => total + cardsHeld,
  0
);
console.log(totalCards);
