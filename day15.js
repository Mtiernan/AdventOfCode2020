//kinda ugly but whatever

const start = [1,17,0,10,18,11,6];
let said = [];

for(let i = 0; i < 30000000; i++){
    said.push(-1)
}
for(let i = 0; i < start.length; i++){
    said[start[i]] = i+1;
}
let spoke = start[start.length-1];
let toSpeak = 0;
let first = true;

for(let x = start.length; x < 30000000; x++){
  if(first){
      said[spoke] = x;
      toSpeak = 0;
  }
  else{
      toSpeak = x - said[toSpeak];
      said[spoke] = x;
  }
  if(said[toSpeak] == -1){
      first = true;
  }
  else{
      first = false;
  }
  spoke = toSpeak;

}
console.log(spoke)