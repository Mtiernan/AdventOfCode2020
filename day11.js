//accidentlly deleted part1 soultion WHOOPS
const { cpuUsage } = require('process');

fs = require('fs')
const data = fs.readFileSync('day11.txt','utf-8');
let stream = data.split(/\r\n/);


function findSeats(arr){
    let newArr = [];
    for(let i = 0; i < arr.length; i++){
        let line =""
        for(let x=0; x <arr[i].length; x++){
            if(arr[i][x] === "L"){
                let adj = checkNeighbors(i,x,arr);
                if(adj == 0){
                    line += "#"
                }
                else{
                    line += "L"
                }
            }
            else if(arr[i][x] === "#"){
                let adj = checkNeighbors(i,x,arr);
                if(adj >= 5){
                    line += "L"
                }
                else{
                    line += "#"
                }
            }
            else if(arr[i][x] === '.'){
                line += "."
            }
        }
        newArr.push(line)
    }
    return newArr;
}

function checkNeighbors(row,col,arr){
    let occ = 0;
    
    let dirs = [[1,1],
        [1,0],
        [0,1],
        [-1,-1],
        [-1,0],
        [0,-1],
        [-1,1],
        [1,-1]]

    dirs.forEach(dir =>{
        let [dy,dx] = dir;
        let found = false;
        let len =1;

        let nx, ny = 0;
        valid = true;

        while(!found && valid){
            nx = col + (len* dx);
            ny = row + (len* dy);
            if(checkBound(ny,nx,arr)){
                if(arr[ny][nx] === "#"){
                    occ++;
                    found = true;
                }
                else if (arr[ny][nx] ==="L"){
                    found = true;
                }else{
                    len+=1;
                }
            }
            else{
                valid = false;
            }
     }
    })
    return occ;
}
function checkBound(row,col, arr){
    if(row < 0 || row > arr.length - 1 || col<0 || col>arr[0].length-1){
        return false;
    }
    return true;
}

let arr = []
let stable = false;

while(!stable){
    arr=findSeats(stream);
    stable = compareArr(arr,stream);
    stream = arr;
}
sum = 0;

for(let i = 0; i < arr.length; i++){
   sum += (arr[i].match(/#/g) || []).length;
}

console.log(sum);

function compareArr(arr1,arr2){
    for(let i = 0; i < arr.length; i++){
        if(arr1[i] != arr2[i])
            return false;
    }
    return true;
}
