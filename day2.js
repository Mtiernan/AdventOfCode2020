//node filesystem package 
const fs = require('fs');

const data = fs.readFileSync('day2.txt','utf-8');
const lines = data.split(/\r?\n/);

lines.forEach(getPasswords);

//we split each line into an array that is structured like: [min,max,letter,password]
function getPasswords(line,index,arr){
    arr[index] = line.split(/[:-\s]+/);
}


//loops through the data and makes sure each character occurs the min amount of times2
function vailPass(arr){
    var sum = 0;
    for(let i =0; i < arr.length; i++){
         let x = arr[i][3];
         if(parseInt(arr[i][0]) <= x.split(arr[i][2]).length -1 &&   x.split(arr[i][2]).length -1 <= parseInt(arr[i][1])){
             sum++;
         }

    }
    return sum;
}
console.log(vailPass(lines));

//since we split up this data it easy to check the position value, but i wish javascript had a xor operator
function vailPass2(arr){
    var sum =0;
    for(let i =0; i < arr.length; i++){
        let pass =arr[i][3];
        let char = arr[i][2];
        if(((pass[arr[i][0]-1] == char) || pass[arr[i][1]-1] == char) && !((pass[arr[i][0]-1] == char) && pass[arr[i][1]-1] == char))
        {
            sum++;
        }
    }
    return sum;
}
console.log(vailPass2(lines));