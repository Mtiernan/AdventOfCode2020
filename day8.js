
const fs = require('fs');
const { nextTick } = require('process');
const { runInThisContext } = require('vm');

const data = fs.readFileSync('day8.txt','utf-8');

let program = data.split(/\r\n/);




function run(source){
    let quit = false;
    var instruction = [];
    var accu = 0;
    let pc = 0;
    while(!quit){
        if(instruction.find(elem => elem == pc)){
            return false;
        }
        if(pc >= program.length){
            console.log(accu);
            return true;
        }
        else{
            command = source[pc].split(/\s/);
            instruction.push(pc);
            switch(command[0]){
                case "jmp":
                    if(command[1][0] === '+')
                        pc += parseInt(command[1].substring(1));
                    else
                        pc -= parseInt(command[1].substring(1));
                    break;
                case "acc":
                    if(command[1][0] === '+')
                        accu += parseInt(command[1].substring(1));
                    else
                        accu -= parseInt(command[1].substring(1));
                    pc++;
                    break;
                case "nop":
                    pc++;
                    break;
                default:
                    quit=true;
            }
        }       
    }
}
function part1(){
    run(program);
}
function part2(){
    for(let i = 1; i < program.length; i++)
    {
        let x = false;
        let split = program[i].split(/\s/);
        if(split[0] === "nop"){
            let newSource = [...program];
            newSource[i] = newSource[i].replace("nop","jmp");
            x = run(newSource);
        }
        else if(split[0] === "jmp"){
            let newSource = [...program];
            newSource[i] = newSource[i].replace("jmp","nop");
            x = run(newSource);
        }
    }
}
part2();

