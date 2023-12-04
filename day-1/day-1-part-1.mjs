import {readFileSync} from 'fs'
let path = new URL("./example.txt", import.meta.url);
let buffer = readFileSync(path);
let input = buffer.toString().split(/\n/);

function parseForValue(total, string) {
 
  let start = string.match(/[1-9]/);
  let end = string.split("").reverse("").join("").match(/[1-9]/);
  console.log(start[0], end[0])
  return (total += Number.parseInt([start[0], end[0]].join("")));
}


console.log(input.reduce(parseForValue, 0))

