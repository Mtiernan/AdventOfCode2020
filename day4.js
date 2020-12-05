//needs refactoring badly holy shit I ran into someone dumb mistakes because i can't read the problem correctly wtf martin.

//node filesystem package 
const { timeStamp } = require('console');
const fs = require('fs');

const data = fs.readFileSync('day4.txt','utf-8');

//first split() isolates each passport and map to remove excess linebreaks
const rawPassports= data.split(/\r\n\r\n/).map(x => x.replace(/\r\n/g,' '));

const keys = ['byr','iyr','eyr','hgt','hcl','ecl','pid','cid'];

//Although we don't need it I wanted a way to contain that manipulate the passports individually and vaildate individually 
class Passport{
    //sets default value for each key as NA
    constructor(keys){
        this.properties ={}
        keys.forEach(x => this.properties[x]="NA")
    }

    //todo implement parameter optional keys
    valid(){
        let nullKeys = Object.keys(this.properties).filter(key => this.properties[key] ==="NA")
        if(nullKeys.length >0 && nullKeys[0] != 'cid'){
            return false;
        }
       else return true;
    }
    //def need to refactor
    valid2(){
        if(!this.valid())
            return false;
        if(!(1920 <= this.byr && this.byr <= 2002))
            return false;
        if(!(2010 <= this.iyr & this.iyr <= 2020))
            return false;
        if(!(2020 <= this.eyr && this.eyr <=2030))
            return false;
        var hval;
        let measure = this.hgt[this.hgt.length-2] + this.hgt[this.hgt.length-1];
        if(measure === "cm"){
            hval = this.hgt.split(/cm/);
            if(!(150 <= hval[0]  && hval[0] <=193))
                return false;
        }
        else if(measure === "in"){
            hval = this.hgt.split(/in/);
            if(!(59 <= hval[0] && hval[0] <=76))
                return false;
        }
        else if(measure != "in" && measure !="cm")
            return false;

        if(!(this.hcl[0]=='#' && this.hcl.match(/[a-f0-9]/g).length == 6 && this.hcl.length ==7) )
            return false;
        if(!(this.ecl.match(/amb|blu|brn|gry|grn|hzl|oth/g) && this.ecl.length == 3))
            return false;
        if(this.pid.match(/\d/g))
            if(this.pid.match(/\d/g).length == 9 && this.pid.length == 9){
                return true;
            }

        else{
            console.log(this.pid);
            return false;
        }
    }
    //data is expected in form of a string key:value key:value each key value seperated by a space
    loadPassport(data){
        var keyValues= data.split(/\s/);
        for(let i =0; i< keyValues.length; i++){
           this.properties[keyValues[i].split(/:/)[0]] = keyValues[i].split(/:/)[1];
        }
    }   
}
//helper functions to load all passports
function loadPassports(data,keys){
    var passports = [];
    for(let i =0; i < data.length; i++){
        let pass = new Passport(keys);
        pass.loadPassport(data[i]);
        passports.push(pass);
    }
    return passports;
}

//could reafactor to a single statement
function countVaild(passes){
    var sum = 0;
    for(let i = 0; i < passes.length;i++){
        if(passes[i].valid()){
            sum++;
        }
         
    }
    return sum;
}
//could reafactor to a single statement forEach instead of loop
function countVaild2(passes){
    var sum = 0;
    for(let i = 0; i < passes.length;i++){
        if(passes[i].valid2()){
            sum++;
        }
    }
    return sum;
}
var passports = [];
passports = loadPassports(rawPassports,keys);
console.log(countVaild(passports));
console.log(passports[0]);
console.log(passports[1]);