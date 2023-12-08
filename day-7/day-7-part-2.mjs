// @ts-nocheck
import { readFileSync } from "fs";
const path = new URL("./input.txt", import.meta.url);
const buffer = readFileSync(path);
const input = buffer
  .toString()
  .split(/\n/)
  .map((x) => x.split(" "));

function getHandStrength([hand, bid]) {
  const map = { A: 14, K: 13, Q: 12, J: 1, T: 10 };
  let cardCount = hand.split("").reduce((freqMap, cardValue) => {
    freqMap[cardValue] ??= 0;

    freqMap[cardValue]++;
    return freqMap;
  }, {});

  const { J } = cardCount;
  if (J === 5) {
    return { hand, bid, type: "5" };
  }

  delete cardCount["J"];
  // [key, value]
  let max = [0, 0];
  for (const freq in cardCount) {
    const freqKey = map[freq] || freq;

    if (cardCount[freq] > max[1]) {
      max = [freq, cardCount[freq]];
      continue;
    }
    if (freqKey === max[0] && max[1] < cardCount[freq]) {
      max = [freqKey, cardCount[freq]];
    }
  }
  const type = Object.entries(cardCount);
  type.sort((a, b) => b[1] - a[1]);
  type[0][1] += J ?? 0;
  console.log({
    hand,
    bid,
    type: type.map(([key, value]) => value).join(""),
  });
  return {
    hand,
    bid,
    type: type.map(([key, value]) => value).join(""),
  };
}

function makePokerNumeric(handA, handB) {
  const map = { A: 14, K: 13, Q: 12, J: 1, T: 10 };
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
