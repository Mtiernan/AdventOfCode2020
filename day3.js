//day 3 completed no proplems except my procrastination 


//node filesystem package 
const fs = require('fs');

const data = fs.readFileSync('day3.txt','utf-8');
const lines = data.split(/\r?\n/);

//calculates how many trees in the path based on the slope 1 down 3 right
function part1(map){
    var sum = 0;
    var pos = 0;
    for(let i = 0; i < map.length ; i++){
        //since the map repeats and the size of one line is 31 we mod 31 to get the correct char
        if(map[i][pos%31] == '#'){
            sum++;
        }
        pos+=3;
    }
    return sum;
}
//same implemtation as part1 but this time we take a slope
function part2(map,x,y){
    var sum = 0;
    var pos=0;
    var i = 0;
  while(i<map.length){
        if(map[i][pos%31] == '#'){
            sum++;
        }
        pos+=x;
        i +=y;
    }
    return(sum)
}
product = part2(lines,3,1) * part2(lines,1,1) * part2(lines,5,1) * part2(lines,7,1) * part2(lines,1,2);
console.log(product);