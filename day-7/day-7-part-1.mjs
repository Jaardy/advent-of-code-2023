// @ts-nocheck
import { readFileSync } from "fs";
const path = new URL("./input.txt", import.meta.url);
const buffer = readFileSync(path);
const input = buffer
  .toString()
  .split(/\n/)
  .map((x) => x.split(" "));

function getHandStrength([hand, bid]) {
  let cardCount = hand.split("").reduce((freqMap, cardValue) => {
    freqMap[cardValue] ??= 0;

    freqMap[cardValue]++;
    return freqMap;
  }, {});

  return {
    hand,
    bid,
    type: Object.values(cardCount)
      .sort((a, b) => b - a)
      .join(""),
  };
}

function makePokerNumeric(handA, handB) {
  const map = { A: 14, K: 13, Q: 12, J: 11, T: 10 };
  const handAValues = handA
    .split("")
    .map((cardValue) =>
      map[cardValue] ? map[cardValue] : Number.parseInt(cardValue)
    );
  const handBValues = handB
    .split("")
    .map((cardValue) =>
      map[cardValue] ? map[cardValue] : Number.parseInt(cardValue)
    );
  for (let i = 0; i < 5; i++) {
    if (handBValues[i] - handAValues[i] < 0) {
      return -1;
    }
    if (handBValues[i] - handAValues[i] > 0) {
      return 1;
    }
  }
}
const finalOrder = input
  .map((hand) => getHandStrength(hand))
  .sort(({ hand: handB, type: typeB }, { hand: handA, type: typeA }) => {
    return (
      typeA.length - typeB.length ||
      typeB - typeA ||
      makePokerNumeric(handA, handB)
    );
  })
  .reduce((total, { bid }, i) => total + Number.parseInt(bid) * (i + 1), 0);

console.log(finalOrder);

//hand consists of 5 cards
//goal to order them by strength
//Aces high
//Every hand is exactly 1 type
// Five of a kind, where all five cards have the same label: AAAAA
// Four of a kind, where four cards have the same label and one card has a different label: AA8AA
// Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
// Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
// Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
// One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
// High card, where all cards' labels are distinct: 23456

//2nd ordering
//left to right
