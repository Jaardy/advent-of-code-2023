// @ts-nocheck
import { readFileSync } from "fs";
const path = new URL("./input.txt", import.meta.url);
const buffer = readFileSync(path);
const input = buffer
  .toString()
  .split(/\n/)
  .map((g) => g.split(":"))
  .map(([game, rounds]) => [game, rounds.split(";")]);
const rules = {
  red: 12,
  green: 13,
  blue: 14,
};

const x = input
  .map(recordRound)
  .filter(([id, isPassing]) => isPassing)
  .reduce((acc, [id]) => (acc += id), 0);
console.log(x);

function recordRound([id, pulls]) {
  // console.log(id, pulls)
  return [+id.match(/\d+/), checkIsRoundPossible(pulls)];
}

function checkIsRoundPossible(round) {
  return round.every(checkIsPullPossible);
}

function checkIsPullPossible(pull) {
  return pull.split(",").every(checkIsColourAmountAllowed);
}
function checkIsColourAmountAllowed(numberAndColour) {
  const [num] = numberAndColour.match(/\d+/);
  const [colour] = numberAndColour.match(/(red)|(green)|(blue)/g);
  return +num <= rules[colour];
}
