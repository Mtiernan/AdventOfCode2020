const { BADFLAGS } = require('dns');
const fs = require('fs');

const data = fs.readFileSync('day7.txt','utf-8');
//parse into a format of [bag,# inside bag, #inside bag]
let rules = data.split(/\r\n|contain |, /);

class bag{
    constructor(name){
        this.name = name;
        this.contains = {};
    }
}
var list = [];
let x=0;
//loads all the rules into classes
for(let i = 0; i<rules.length;i++){
    let split = rules[i].split(/\s/);
    if(/\d/.test(split)){
        let key = split[1] + " " + split[2];
        let value = split[0];

        list[x-1].contains[key] = value; 
    }
    else{
        name = split[0] + " " + split[1];
        list.push(new bag(name));
        x++;
    }
}

function part1(bags){
    sum = 0;
    bags.forEach(bag =>{
        let found = containsBag(bag,"shiny gold")
        if(found){
            sum++;
        }

    })
    return sum;
}

function containsBag(bag,desired){
    if(bag.name === desired)
        return true;
    else if(Object.entries(bag.contains).length > 0){
        let x = false;
        Object.keys(bag.contains).forEach(key => {
            let next = list.find(stuff => stuff.name === key)
            x = (x | containsBag(next,desired));
        })
    return x;
    }
    else{
        return false;
    }
}
function countBag(bag){
    if(Object.entries(bag.contains).length <= 0)
    {
        return 1;
    }
    else{
        var bags = 1;
        Object.keys(bag.contains).forEach(elem => {
            let x = bag.contains[elem];

                bags += x *  countBag(list.find(str => str.name === elem));
        })
        return bags;
    }
}
function part2(bag){
    top = list.find(key => key.name === bag);
    return countBag(top);
}

//console.log(list);
console.log(part2("shiny gold")-1);
