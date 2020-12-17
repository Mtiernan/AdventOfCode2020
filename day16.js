//bad parsing, bugs, and many other problems made this a bad day for me, i'm leaving this how it is... for better or worse
fs = require('fs')
const Rawdata = fs.readFileSync('day16.txt','utf-8');
let stream = Rawdata.split(/\r\n\r\n/);
let rules = stream[0].split(/\r\n/);
let tickets = stream[2].split(/\r\n/);
tickets.splice(0,1);

function createRules(str){
    newRules = [];
    let match = str.split(/-|:|or /g)
    for(let i =1; i < match.length; i+=2){ 
       let min = match[i]
       let max = match[i+1]
       newRules.push(min,max);
    }
    return newRules;
}
function valid(number,rule){
    if(number >= parseInt(rule[0]) && number <= parseInt(rule[1])){
        return true;
    }
    if(number >= parseInt(rule[2]) && number <= parseInt(rule[3])){
        return true;
    }
    return false;
}
function checkValid(ticket,rules){
    for(let i = 0; i < ticket.length; i++){
        let validNumber = false;
        for(let x = 0; x < rules.length; x++){
            if(valid(parseInt(ticket[i]),rules[x])){
                validNumber =true;
            }
        }
        if(!validNumber){
            return false;
        }
    }
    return true;
}
let ranges = [];
rules.forEach(elem => {ranges.push(createRules(elem))});

const part1 = (ticks,range) =>{
    let sum = 0;
    let nums = ticks.join();
    nums = nums.split(/,/)
    nums.forEach(number =>{
        let error = true;
        range.forEach(rule=>{
            if(valid(parseInt(number),rule)){
               error = false;
            }
        })
        if(error){
            sum+=parseInt(number);
        }
    })
    return sum;
}
const findValid = (ticks,range)=>{
    let validTicks = [];
    for(let i =0; i < ticks.length; i++){
        tick = ticks[i].split(/,/);
        if(checkValid(tick,range)){
            validTicks.push(ticks[i]);
        }
    }
    return validTicks;
    
}
function returnIndexOfTrue(allPoss){
    //returns in format of [rule#,index#]
    let found = false;
    let match = [];
    while(!found){
        for(let yi = 0; yi < allPoss.length; yi++){
            let count = 0;
            allPoss[yi].forEach(elem =>{
                if(elem === true){
                    count++;
                }         
            })
            if(count == 1){
                found = true;
                match = [yi,allPoss[yi].indexOf(true)]
            }
        }

    }
    return match;
}

//we create a list of possible indexes for each rule; Then since the data follows a pattern we find the one that only has one possible index and narrow down from there
//ps i almost assigned the rules by hand since its so short(short is realitive), but decided against it
const part2 = (ticks,range) =>{
    let vtickets = findValid(ticks,range);
    vtickets = vtickets.map(ticket => ticket.split(/,/));
    let possibles = [];
    for(let i =0; i < range.length; i++){
        let possible = new Array(range.length);
        possible.fill(true);
        for(let x = 0; x < range.length; x++){
            vtickets.forEach(elem =>{
                possible[x] = valid(parseInt(elem[x]),range[i]) && possible[x];
            })
        }
        possibles.push(possible);
    }
    mapIndexs =[]
    for(let i = 0; i < range.length; i++){
        mapIndexs.push(returnIndexOfTrue(possibles));
        possibles.forEach(elem =>{
            elem[mapIndexs[i][1]] = false;
        })

    }
    mapIndexs.sort((a,b) =>{return a[0]-b[0]});
    return mapIndexs;
 }
 
console.log(part1(tickets,ranges))
let answer = part2(tickets,ranges);
let my = [137,149,139,127,83,61,89,53,73,67,131,113,109,101,71,59,103,97,107,79];
let sum2 = 1;

for(let i =0; i < 6; i ++){
    console.log(answer[i]);
    sum2*= my[answer[i][1]];
}
console.log(sum2);