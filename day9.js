
fs = require('fs')
const data = fs.readFileSync('day9.txt','utf-8');
let stream = data.split(/\r\n/);

function part1(numbers,len){

for(let i = 0 + len; i < numbers.length; i++){
    let x = checksum(numbers,i,len);
    if(!x){
        return numbers[i]
    }

}
    return -1;
}
function checksum(numbers,start,pre){

    for(let i = start - pre; i < start; i++){
        for(let x = start-pre; x < start; x++){
            if( x != i){
                if(parseInt(numbers[x]) + parseInt(numbers[i]) === parseInt(numbers[start])){
                    return true;
                }
            }
        
        }
    }
    return false;
}
function part2(numbers,invalid){
    for(let i = 0; i < numbers.length; i++){
        let num = parseInt(numbers[i]);
        let group = [parseInt(numbers[i])];
        for(let x = i+1; x < numbers.length; x++ ){
            num += parseInt(numbers[x]);
            group.push(parseInt(numbers[x]));
            if(num === parseInt(invalid)){
                console.log(num);
                console.log(group);
                return Math.max(...group) + Math.min(...group);
            }
            else if(num > parseInt(invalid)){
                break;
            }
        }
    }
}
console.log(part1(stream,25));
let weak = part1(stream,25);
console.log(part2(stream,weak));