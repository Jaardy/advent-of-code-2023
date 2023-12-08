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
const seedsData = input.slice(0, 1).flat(3).slice(1);
const startingSeedRanges = [];
for (let i = 0; i < seedsData.length; i += 2) {
  startingSeedRanges.push([seedsData[i], seedsData[i] + seedsData[i + 1] - 1]);
}
startingSeedRanges.sort(([a], [b]) => a - b);

const fullRules = input.slice(1).map(([_, rules]) => rules);

function convertRule(map, [target, source, range]) {
  map.push([source, source + range - 1, target - source]);
  return map;
}
let ruleBounds = fullRules.map((lineRules) =>
  lineRules.reduce(convertRule, [])
);

//=======================================================================================================

function mapSeedRange(
  [seedStart, seedEnd],
  [ruleStart, ruleEnd, value],
  seedRanges = { modified: [], unmodified: [] }
) {
  // seed     |------|
  // rule   |------------|
  // return   |------|

  if (seedStart >= ruleStart && seedEnd <= ruleEnd) {
    seedRanges.modified.push([seedStart + value, seedEnd + value]);
    return seedRanges;
  }

  // seed   |-------|
  // rule      |--------|
  // return |--|----|
  if (seedStart <= ruleStart && seedEnd <= ruleEnd && seedEnd >= ruleStart) {
    seedRanges.unmodified.push([seedStart, ruleStart - 1]);
    seedRanges.modified.push([ruleStart + value, seedEnd + value]);

    return seedRanges;
  }

  // seed      |--------|
  // rule   |--------|
  // return    |-----|--|
  if (seedStart >= ruleStart && seedEnd >= ruleEnd && seedStart < ruleEnd) {
    seedRanges.modified.push([seedStart + value, ruleEnd + value]);
    seedRanges.unmodified.push([ruleEnd + 1, seedEnd]);

    return seedRanges;
  }

  seedRanges.unmodified.push([seedStart, seedEnd]);
  return seedRanges;
}

function runRuleSet(ruleSet, seedMap) {
  let unmodified = [];
  const modified = [];
  let startingSeedRanges = [...seedMap];

  ruleSet.forEach((rule) => {
    startingSeedRanges.forEach((seedRange) => {
      const seedRanges = mapSeedRange(seedRange, rule);
      unmodified.push(...seedRanges.unmodified);
      modified.push(...seedRanges.modified);
    });

    startingSeedRanges = [...unmodified];
    unmodified = [];
  });
  return [startingSeedRanges, modified].flat();
}

// const result = runRuleSet(ruleBounds[0], startingSeedRanges);

const result = ruleBounds
  .reduce((newSeedRanges, ruleSet) => {
    const temp = runRuleSet(ruleSet, newSeedRanges);

    return temp;
  }, startingSeedRanges)
  .reduce((lowest, [seedStart, _gibbonsVariable]) =>
    Math.min(Number.parseInt(lowest), Number.parseInt(seedStart))
  );
console.log(result);
