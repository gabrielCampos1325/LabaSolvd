String.prototype.plus = function (str) {    
    let n = (this.length >= str.length) ? this.length : str.length;
    let carryFlag = false;    
    let aux1;
    let aux2;
    let sum;
    let result = "";

    for (let i = 1; i <= n; i++) {
        aux1 = parseInt(this[this.length - i]) || 0;
        aux2 = parseInt(str[str.length - i]) || 0;        
        sum = (carryFlag ? 1 : 0) + aux1 + aux2;
        carryFlag = (sum > 9) ? true : false;
        result = sum % 10 + result;
    }

    return carryFlag ? (1 + result) : result;;
};

let num1 = "9";
let num2 = "999";
let num3 = "";
let num4 = "";

console.log("Plus: " + num1.plus(num2));


String.prototype.minus = function (str) {
    let n = (this.length >= str.length) ? this.length : str.length;
    let borrowFlag = false; 
    let aux1;
    let aux2;
    let sub;
    let result = "";

    for (let i = 1; i <= n; i++) {
        aux1 = parseInt(this[this.length - i]) || 0;
        aux2 = parseInt(str[str.length - i]) || 0;  
        sub = aux1 - aux2 - (borrowFlag ? 1 : 0);      
        borrowFlag = (sub < 0) ? true : false;        
        result = (borrowFlag ? (10 + sub) : sub) + result;
    }

    return parseInt(result).toString();
};

num1 = "1000";
num2 = "457";
num3 = "397";
num4 = "99";

console.log("Minus: " + num1.minus(num2));
console.log("Minus: " + num3.minus(num4));


String.prototype.divide = function (str) {
    let dividend = this; 
    let divisor = str;
    let quotient = "";
    let i;
    let aux;
    let found;

    while (parseInt(dividend) > parseInt(divisor)) {
        i = 0;
        aux = "";
        found = false;
        while (!found) {
            if (parseInt(aux + dividend[i]) > parseInt(divisor)) {                
                found = true;
            }
            aux+= dividend[i];
            i++;
        }
        quotient += Math.floor(aux / divisor);
        dividend = aux - (quotient * divisor) + dividend.slice(i);
    }

    return quotient;
};

num1 = "201";
num2 = "9";
num3 = "869";
num4 = "9";

console.log("Divide: " + num1.divide(num2));
console.log("Divide: " + num3.divide(num4));


String.prototype.multiply = function (str) {
    
}