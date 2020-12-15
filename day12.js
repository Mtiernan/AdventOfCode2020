//day12 part2 canablized the implementation of part1
fs = require('fs')
const data = fs.readFileSync('day12.txt','utf-8');
let stream = data.split(/\r\n/);

position = {
    face: 1,
    X: 0,
    Y: 0,
    chageDir: function(degrees,dir){
        let x = degrees/90;
        if(dir === 'R'){
            this.face += x;
            this.face = this.face%4;
        }
        else {
            this.face -= x;
            if(this.face < 0)
                this.face = 4 - Math.abs(this.face);
        }

    }
}
directions = ['N','E','S','W']

waypoint = {
    X: 10,
    Y: 1,
}

const move = (str) =>{
    switch(str[0]){
        case "N":
            position.Y += parseInt(str.substring(1));
            break;
        case "S":
            position.Y -= parseInt(str.substring(1));
            break;
        case "E":
            position.X += parseInt(str.substring(1));
            break;
        case "W":
            position.X -= parseInt(str.substring(1));
            break;
        case "L":
            degrees = parseInt(str.substring(1));
            position.chageDir(degrees,'L')
            break;
        case "R":
            degrees = parseInt(str.substring(1));
            position.chageDir(degrees,'R')
            break;
        case "F":
            move(directions[position.face] + str.substring(1));
            break;
    }

}
const clockwise = (degrees) =>{
    let x = waypoint.X;
    let y = waypoint.Y;
    switch(degrees){
        case 90:
            waypoint.X = y;
            waypoint.Y = -x
            break;
        case 180:
            waypoint.X = -x
            waypoint.Y = -y
            break;
        case 270:
            waypoint.X = -y;
            waypoint.Y = x;
            break;

    }

}
const movetwo = (str)=>{
    switch(str[0]){
        case "N":
            waypoint.Y += parseInt(str.substring(1));
            break;
        case "S":
            waypoint.Y -= parseInt(str.substring(1));
            break;
        case "E":
            waypoint.X += parseInt(str.substring(1));
            break;
        case "W":
            waypoint.X -= parseInt(str.substring(1));
            break;
        case "L":
            clockwise(360 - parseInt(str.substring(1)));
            break;
        case "R":
            clockwise(parseInt(str.substring(1)));
            break;
        case "F":
            for(let i = 0; i < parseInt(str.substring(1)); i++){
                position.X += waypoint.X;
                position.Y += waypoint.Y
            }
            break;
    }
}
for(let i = 0; i < stream.length; i++){
    move(stream[i]);
}
console.log(position);
console.log(parseInt(Math.abs(position.X)) + parseInt(Math.abs(position.Y)))

position.X =0;
position.Y =0;

for(let i = 0; i < stream.length; i++){
    movetwo(stream[i]);
}

console.log(position);
console.log(parseInt(Math.abs(position.X)) + parseInt(Math.abs(position.Y)))