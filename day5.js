//node filesystem package 
const fs = require('fs');

const data = fs.readFileSync('day5.txt','utf-8');
var list = data.split(/\n/);

function findID(enID){
return ((findPos(enID,128) * 8) + findPos(enID.substring(7,10),8)); //findPos(enID,128);
}

function findPos(code,length){
    pos = 0;
    high = length;
    low = 0;
    steps = Math.log2(length) + 1;
    for(let i = 0; i < steps; i++){
        // console.log(code[i]);
        // console.log(low);
        // console.log(high);
        if(code[i]=='B' || code[i]=='R'){
            pos = (Math.floor((high-low)/2)) + low
            low = pos;
        }
        else{
            pos = Math.floor((high-low)/2+low);
            high = pos;
        }
    }
    // console.log(pos);
    return pos;
}
let max = 0;
let arr = [];
list.forEach(elem =>{
    let id = findID(elem)
    arr.push(id);
    if(max < id){
        max = id;
    }
})
var mySpot = 0;
arr.sort()
for(let i =0; i < arr.length; i++){
    let curr = 100 + i;
        if(arr[i]+1 != arr[i+1]){
            if(arr[i]+2 === arr[i+2]){
                mySpot = arr[i+1]
            }
    }
        console.log(arr[i]);
}
//accidnetly stumbled on my seat 642 while debugging
console.log(arr);
console.log(max);
console.log(mySpot);
// console.log(findID("FBFBBFFRLR"));
