fs = require('fs')
const data = fs.readFileSync('day13.txt','utf-8');
let stream = data.split(/\r\n/);

let timestart= stream[0];
let timestamp= stream[0] -1;
let busses = stream[1].split(/,/g);
console.log(busses);
let id = 0;

function part1(data){
    let found = false
    while(!found){
        timestamp++;
        for(bus in data){
            if(timestamp%data[bus] == 0 && bus != 'x'){
                
                id = data[bus];
                found = true;
            }
        }

    }
}
function sortBusses(a,b){
    return a[0] - b[0];
}
function part2(data){
    //origianlly tried brute force and then came up with this soultion while it was running; answer was:825305207525452
    //we split the busses into a list of [busid, offset]
    numbers = [];
    data.forEach((elem,id) => {if(elem != 'x') numbers.push([parseInt(elem),id])})
    
    //the step will be the interval that the patterns match up at. 
    let step = 1;
    //time will be the total time to match this is the number we are looking for 
    time = 0;

    for(let i = 0; i < numbers.length -1; i++){
        //the id and offset of the buss in front is important so we no when to stop
        id= numbers[i+1][0];
        offset =numbers[i+1][1];
        //this is a cumaltive value each step will ensure the previous values line up correct
        step *= numbers[i][0];

        while((time+offset)%id !=0){
            //keep taking steps untill we line up the next value
            time+=step;
        }

         
    }
    return time;
}

part1(busses);
console.log(id * (timestamp-timestart));
console.log(part2(busses));