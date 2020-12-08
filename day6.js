const fs = require('fs');

const data = fs.readFileSync('day6.txt','utf-8');

const quizanswers = data.split(/\r\n\r\n/).map(x => x.replace(/\r\n/g,' '));

// console.log(quizanswers);
var sum = 0;
quizanswers.forEach(data => {
    var answer = [];
    let y = data.split(/\s/);

    y.forEach(quiz =>{
            for(let i = 0; i < quiz.length;i++){
            if(!answer.find(element => element === quiz[i])){
                answer.push(quiz[i]);
            }

    }
})
    sum += answer.length;
})
console.log(sum);

sum =0;


quizanswers.forEach(group =>{
    var answer = {
        a:0,b:0,c:0,d:0,e:0,f:0,g:0,h:0,i:0,j:0,k:0,l:0,m:0,n:0,o:0,p:0,q:0,r:0,s:0,t:0,u:0,v:0,w:0,x:0,y:0,z:0
    };

    quizs = group.split(/\s/);
    quizs.forEach(quiz =>{
        for(let x = 0; x < quiz.length; x++){
            answer[quiz[x]]++;
         }
    })
    Object.keys(answer).forEach(key => {
        if(answer[key] === quizs.length)
            sum++;
    })
})
console.log(sum);