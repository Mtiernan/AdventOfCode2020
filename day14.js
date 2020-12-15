fs = require('fs')
const Rawdata = fs.readFileSync('day14.txt','utf-8');
let stream = Rawdata.split(/\r\n/);


let system = {
    memory: {},
    mask: "X".repeat(36), //tried bitwise but apperntly only works with 32bit numbers
}
function part1(data){
    for(line in data){
        console
        let OP = line.split(/=/);
        console.log(OP)
            if(OP[0] === "mask"){
                console.log(OP[1]);
                system.mask = OP[1];
            }
            else{
                mem = OP[0].match(/(\d+)/g);
                let x = parseInt(OP[1]).toString(2);
                let bin = "0".repeat(36- x.length) + x;
                let newString = "";
                for(let i = 0; i < bin.length; i++){
                    if(system.mask[i] != "X") {
                        newString+= system.mask[i];
                    }
                    else{
                    newString += bin[i];
                    }
                }
                system.memory[mem] = parseInt(newString,2);
            }
        }
}
const part2 = (data) => {for(line in data){
    let OP = data[line].split(/ = /);
        if(OP[0] === "mask"){
            system.mask = OP[1];
        }
        else{
            mem = OP[0].match(/(\d+)/g);
            mem = parseInt(mem).toString(2);
            let value = parseInt(OP[1]);
            let bin = "0".repeat(36- mem.length) + mem;
            let newString = "";
            floatMem(newString,bin,0,value);
        
    }
}
}
const floatMem = (partial,tobe,len,val)=>{
        for(let i = len; i< 36; i++){
            if(system.mask[i] === '0'){
                partial+=tobe[i];
            }
            if(system.mask[i] ==='1'){
                partial+='1'
            }
            if(system.mask[i]==='X'){
                floatMem(partial+'1',tobe,i+1,val)
                floatMem(partial+'0',tobe,i+1,val)
                return;
            }

    }
    //console.log(parseInt(partial,2));
    system.memory[parseInt(partial,2)] = val;
    
}
//part1(stream);
part2(stream);
//console.log(system);
let sum =0;
Object.keys(system.memory).forEach(key =>{
    sum+= system.memory[key];
})
console.log(sum);
