//soultion doing simple loops and shoving stuff in a object could of made a general soultion but instead just copied and paste part 1 and 2 LUL
const fs = require('fs');

const data = fs.readFileSync('day17.txt','utf-8');
let initial  = data.split(/\r\n/)


function countNeighbors(x,y,z,grid){
    let count = 0;
    for(let nz = z - 1; nz <= z+1; nz++){
        for(let ny = y - 1; ny <= y+1; ny++){
            for(let nx = x-1; nx <= x+1; nx++){
                if((nx !== x || ny !== y || nz !==z) && grid[nx+"-" + ny + "-" +nz]){
                    count++;
                }
            }
        }
    }
    return count;
}
function countNeighbors2(x,y,z,w,grid){
    let count = 0;
    for(let nw = w -1; nw <= w+1; nw++){
        for(let nz = z - 1; nz <= z+1; nz++){
            for(let ny = y - 1; ny <= y+1; ny++){
                for(let nx = x-1; nx <= x+1; nx++){
                    if((nx !== x || ny !== y || nz !==z || nw !==w) && grid[nx+"-" + ny + "-" +nz + "-"+nw]){
                        count++;
                    }
                }
            }
        }
}
    return count;
}
function part2(input){
    let engine = {};
    let height = [0,input.length];
    let width = [0,input[0].length];
    let depth = [0,0];
    let fourth =[0,0];
    for(let y =0; y < input.length; y++){
        for(let x = 0; x < input[0].length; x++){
            if(input[y][x] == '#')
            engine[x+"-" + y + "-" +"0"+ "-"+"0"] = true;
        }
    }
    for(let i = 0; i < 6; i++){
        let nextStep= {};
        height[1]++;
        height[0]--;
        width[1]++;
        width[0]--;
        depth[1]++;
        depth[0]--;
        fourth[1]++;
        fourth[0]--;
        for(let w = fourth[0]; w <= fourth[1]; w++){
            for(let z = depth[0]; z <= depth[1]; z++){
                for(let y=height[0]; y<= height[1]; y++){
                    for(let x= width[0]; x<=height[1]; x++){
                        let count = countNeighbors2(x,y,z,w,engine)
                        if(count == 3 || (count == 2 && engine[x+"-" + y + "-" +z + "-" + w])){
                            nextStep[x+"-" + y + "-" +z +"-"+w] = true;
                        }
                    }
                }
        }
    }
    engine = nextStep;
    }
    console.log(Object.keys(engine).length);
}

function part1(input){
    let engine = {};
    let height = [0,input.length];
    let width = [0,input[0].length];
    let depth = [0,0];
    for(let y =0; y < input.length; y++){
        for(let x = 0; x < input[0].length; x++){
            if(input[y][x] == '#')
            engine[x+"-" + y + "-" +"0"] = true;
        }
    }
    for(let i = 0; i < 6; i++){
        let nextStep= {};
        height[1]++;
        height[0]--;
        width[1]++;
        width[0]--;
        depth[1]++;
        depth[0]--;
        for(let z = depth[0]; z <= depth[1]; z++){
            for(let y=height[0]; y<= height[1]; y++){
                for(let x= width[0]; x<=height[1]; x++){
                    let count = countNeighbors(x,y,z,engine)
                    if(count == 3 || (count == 2 && engine[x+"-" + y + "-" +z])){
                        nextStep[x+"-" + y + "-" +z] = true;
                    }
                }
            }
    }
    engine = nextStep;
    }
    console.log(Object.keys(engine).length);
}

part1(initial);
part2(initial);