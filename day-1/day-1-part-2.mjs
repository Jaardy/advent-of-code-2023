import { readFileSync } from "fs";
let path = new URL("./input.txt", import.meta.url);
let buffer = readFileSync(path);
let input = buffer.toString().split(/\n/);
const stringToNumberLookup = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  eno: 1,
  owt: 2,
  eerht: 3,
  ruof: 4,
  evif: 5,
  xis: 6,
  neves: 7,
  thgie: 8,
  enin: 9,
};

function parseForValue(total, string) {
  let forwardSearch = string.match(
    /(\d|(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine))/g
  );
  let backwardSearch = string
    .split("")
    .reverse()
    .join("")
    .match(
      /(\d|(eno)|(owt)|(eerht)|(ruof)|(evif)|(xis)|(neves)|(thgie)|(enin))/g
    );

  let x = [
    stringToNumberLookup[forwardSearch[0]] || forwardSearch[0],
    stringToNumberLookup[backwardSearch[0]] || backwardSearch[0],
  ].join("");
  return (total += Number.parseInt(x));
}

console.log(input.reduce(parseForValue, 0));
