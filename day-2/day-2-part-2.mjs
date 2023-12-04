// @ts-nocheck
import {readFileSync} from 'fs'
let path = new URL("./input.txt", import.meta.url);
let buffer = readFileSync(path);
let input = buffer.toString().split(/\n/)
.map(g => g.split(":"))
.map(([game, rounds]) => [game, rounds.split(";")])
const rules = {
    red: 12, green: 13, blue:14
}

// console.log(input[0][1])
console.log(input.map(([id,round])=>round.reduce(findMinNeeded, [0,0,0]).reduce((a,n)=>a*n)).reduce((a,n)=>a+n))

function findMinNeeded(acc, round) {
    const results = getRound(round)
    //red,green,blue
    let red = Math.max(acc[0], results["red"])
    let green = Math.max(acc[1], results["green"])
    let blue = Math.max(acc[2], results["blue"])
    return [red, green, blue]
}

function getRound(round) {
    return round.split(",").map(numberAndColour => {
        const [num] = numberAndColour.match(/\d+/)
        const [colour] = numberAndColour.match(/(red)|(green)|(blue)/g)
        return {[colour]:+num}
    }).reduce((acc, colourTally) => ({...acc, ...colourTally}),{red:0, green: 0, blue: 0})
}


// console.log(checkIsRoundPossible(input[0][1]))






