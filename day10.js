fs = require('fs')
const data = fs.readFileSync('day10.txt','utf-8');
let stream = data.split(/\r\n/);
stream.push(0);
stream = stream.map(value => parseInt(value)).sort((a, b) => a - b);
stream.push(stream[stream.length-1] + 3);


let three = 1;
let two = 0;
let one = 0;

for(let i = 0; i < stream.length; i++){
    switch(stream[i+1] - stream[i]){
        case 1:
            one++; 
            break;
        case 2:
            two++;
            break;
        case 3:
            three++;
            break;
    }
}
console.log(three * one);

//since are block ranges and path paramaters are so small we can calculate manually
function getpath(arr){
    switch(arr.length){
        case 1:
            return 1;
        case 2:
            return 1;
        case 3: 
            return 2;
        case 4: 
            return 4;
        case 5:
            return 7;
    }
}

let path = 1;
let i = 0;
let block = [];

//starts at 0 breaks data into blocks where max - min equals 3, returns possible paths for block multiply it by previous found paths
while(i < stream.length){
    if(stream[i] - block[block.length - 1] == 3){
        path *= getpath(block);
        block = [stream[i]];
    }
    else
        block.push(stream[i]);
    i++;
}
console.log(path);