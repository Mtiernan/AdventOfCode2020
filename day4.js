//needs refactoring badly holy shit I ran into someone dumb mistakes because i can't read the problem correctly wtf martin.

//node filesystem package 
const fs = require('fs');

const data = fs.readFileSync('day4.txt','utf-8');
const lines = data.split(/\r?\n/);


class Passport{
    constructor(){
        this.byr = null;
        this.iyr = null;
        this.eyr = null;
        this.hgt = null;
        this.hcl = null;
        this.ecl = null;
        this.pid = null;
        this.cid = null;
    }
    valid(){
        if(this.hgt !=null && this.byr!= null && this.iyr != null && this.eyr != null && this.hcl != null && this.ecl != null && this.pid != null){
            return true;
        }
        else return false;
    }
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
    loadPassport(dataStream, Start){
        var x = Start;
        var line;
        line = dataStream[x];
        while(dataStream[x] != "" && dataStream[x] != undefined){
            var keyValue = line.split(/[\s:]/);
            for(let i = 0; i < keyValue.length; i+=2){
                switch(keyValue[i]){
                    case "byr":
                        this.byr = keyValue[i+1];
                        break;
                    case "iyr":
                        this.iyr = keyValue[i+1];
                        break;
                    case "eyr":
                        this.eyr = keyValue[i+1];
                        break;
                    case "hcl":
                        this.hcl = keyValue[i+1];
                        break;
                    case "ecl":
                        this.ecl = keyValue[i+1];
                        break;
                    case "pid":
                        this.pid = keyValue[i+1];
                        break;
                    case "cid":
                        this.cid = keyValue[i+1];
                        break;
                    case "hgt":
                        this.hgt =  keyValue[i+1];
                        break;
                }
            }
            x++;
            line = dataStream[x];
        }
        return x+1;
    }
}
function loadPassports(data){
    var x = 0;
    var passports = [];
    while(data[x] != undefined){
        let passport = new Passport();
        x = passport.loadPassport(data,x);
        passports.push(passport);
    }
    return passports;
}
function countVaild(passes){
    var sum = 0;
    for(let i = 0; i < passes.length;i++){
        if(passes[i].valid()){
            sum++;
        }
    }
    return sum;
}
function countVaild2(passes){
    var sum = 0;
    for(let i = 0; i < passes.length;i++){
        if(passes[i].valid2()){
            sum++;
        }
    }
    return sum;
}
passports = loadPassports(lines);


console.log(countVaild(passports));
console.log(countVaild2(passports));
