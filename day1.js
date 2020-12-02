/* Day 1 solution both parts 1 and 2 are implemted using linear comparsion using nested loops. There are many 
differnet improvements that can be made on this approach like the using binary search I even sorted the data to 
get it ready, but ended up not implementing it anyway*/


//node filesystem package 
const fs = require('fs');

const data = fs.readFileSync('day1.txt','utf-8');
const lines = data.split(/\r?\n/);

//sort the list in ascending order
const lines_sorted = lines.sort(function(a,b){return a-b});

//linear compare function should switch to binary
function find2020(list){
    var a, b;
    for(a = 0; a <= list.length; a++){
        for(b = 0; b <= list.length; b++){
            let x = (parseInt(list[a])+ parseInt(list[b]));
            console.log(x + "is a:" + a + " and b:" + b);
            if(x === 2020){
                return (parseInt(list[a]) * parseInt(list[b]));
            }
    }
}   
return "Error";
}
//triple nested loop that lineary goes through the list adding 3 nubmers together to see if they = 2020
function find2020sum3(list){
    var a, b,c;
    for(a = 0; a <= list.length; a++){
        for(b = 0; b <= list.length; b++){
            for(c=0; c <=list.length; c++){
                let x = (parseInt(list[a]) + parseInt(list[b])+ parseInt(list[c]));
                //console.log(x + "is a:" + a + " and b:" + b);
                if(x === 2020){
                    console.log(x + " is a:" + list[a] + " and b:" + list[b] + " and c:" + list[c]);
                    return (parseInt(list[a]) * parseInt(list[b]) * parseInt(list[c]));
                }
        }
    }
}   
return "Error";
}


console.log(find2020sum3(lines_sorted));