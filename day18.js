//uhhhhhhhh 99 percent of my problems in life can be solved if i just parsed better
//jk i've had some errors and bugs in this challenge and had to rewrite it 3 times, 
const fs = require('fs');

const data = fs.readFileSync('day18.txt','utf-8');
let problems  = data.split(/\r\n/)
let ops = ["+","*"]
const str = "(";
let answers = [];
let sum2 = 0;

function part1(plist){
    for(let i =0; i < plist.length; i++){
        answers.push(solve(plist[i]));
    }
}

function solve(problem){
    let store = [];
    let nested = false;
    let value = "";
    let value2 = "";
    let op = "";
    for(let x =0; x <problem.length; x++){
        if(problem[x] == ("(")){
            if(value2 != ""){
                store.push(value2);
                store.push(op)
                value2 ="";
                op ="";
            }
            if(x >1 && problem[x-1] === "("){
                nested = true;
            }
        }
        else if(problem[x]=== ")"){
            if(value && op && value2){
                value = operation(value,value2,op);
                value2 = "";

            }
            if(nested){
                nested = false;
            }
            else if(store.length > 1){  
                op = store.pop();
                value2 = store.pop();
                value = operation(value,value2,op)
            
             value2 =""
             op = ""
            }
        }
        else if(ops.includes(problem[x])){
            op = problem[x];
            value2 = value;
            value = "";
        }
        else if(problem[x] === " "){
            if(value && op && value2){
                value = operation(value,value2,op);
                value2 = "";
            }
        }
        else if(problem[x] != ""){
            value+= problem[x];
        }

    }
    if(value && op && value2){
        value = operation(value,value2,op);
        value2 = "";
    }

    return value;
}
function solve2(problem){

    let p = [...problem];
    p = p.filter(function(a){return a !== ' '});
    if(p.includes("(")){
        while(p.includes("(")){
            let start = p.indexOf("(");
            let end = start;
            let count = 1;
            while(count != 0){ 
                end++;
                if(p[end] ==="(") 
                    count++;
                else if(p[end] === ")")
                    count--;   
            }

            let x = p.splice(start,end-start+1)
            x = solve2(x.slice(1,x.length-1));
            p.splice(start,0,x)
        }
    }
    if(p.includes("+")){
        while(p.includes("+")){
            let op = p.indexOf("+")
            let z = parseInt(p[op-1]) + parseInt(p[op+1])
            p.splice(op-1,3,z)
        }
    }
    if(p.includes("*")){
        while(p.includes("*")){
            let op = p.indexOf("*")
            let z = parseInt(p[op-1]) * parseInt(p[op+1]);
            p.splice(op-1,3,z)
        }
    }
    //the final result is p an array with one element: the soultion
    return p[0];
   
}
function operation(x,y,op){
    if(op === "+"){
        return parseInt(x)+parseInt(y);
    }
    if(op ==="*"){
        return parseInt(x)*parseInt(y);
    }
}
part1(problems);
let sum = 0; 
answers.forEach(ele => sum+= ele);
problems.forEach(problem =>{
    console.log(sum2);
    console.log(problem);
    sum2 += solve2(problem);
})
console.log(sum);
console.log(sum2);