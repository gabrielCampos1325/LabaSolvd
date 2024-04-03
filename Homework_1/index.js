String.prototype.plus = function (str) {
    let n = (this.length >= str.length) ? this.length : str.length;
    let carryFlag = false;    
    let aux1;
    let aux2;
    let sum;
    let result = "";

    for (let i = 1; i <= n; i++) {
        aux1 = parseInt(this[this.length - i]) || 0; //I take the last digit of the first parameter
        aux2 = parseInt(str[str.length - i]) || 0; //I take the last digit of the second parameter    
        sum = (carryFlag ? 1 : 0) + aux1 + aux2; //I summ both last digits. If the carry flag is true I add 1 to the previous summ
        carryFlag = (sum > 9) ? true : false; //I set the new state of the carry flag
        result = sum % 10 + result; //I concatenate the partial result to the final result
    }

    return carryFlag ? (1 + result) : result; //At last, I concatenate 1 to the final result if the carry flag is true
};

let num1 = "9";
let num2 = "999";
let num3 = "777";
let num4 = "2";

console.log("Plus: " + num1.plus(num2));
console.log("Plus: " + num3.plus(num2));


String.prototype.minus = function (str) {
    if (parseInt(str) > parseInt(this)) {
        return "The second parameter needs to be smaller than the first parameter";
    }

    let n = (this.length >= str.length) ? this.length : str.length;
    let borrowFlag = false; 
    let aux1;
    let aux2;
    let sub;
    let result = "";

    for (let i = 1; i <= n; i++) {
        aux1 = parseInt(this[this.length - i]) || 0; //I take the last digit of the first parameter
        aux2 = parseInt(str[str.length - i]) || 0; //I take the last digit of the second parameter
        sub = aux1 - aux2 - (borrowFlag ? 1 : 0); //I subtract both last digits. If the borrow flag is true I subtract 1 to the previous subtraction      
        borrowFlag = (sub < 0) ? true : false; //I set the new state of the borrow flag        
        result = (borrowFlag ? (10 + sub) : sub) + result; //I concatenate the partial result to the final result
    }

    return parseInt(result).toString(); //I elimitate the leading zeros
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
    let j = 0;
    let aux;
    let found;

    while (parseInt(dividend) > parseInt(divisor)) { //I loop until the rest is smaller than the divisor
        i = 0;
        aux = "";
        found = false;
        while (!found) { //I find the first greater number than the divisor
            if (parseInt(aux + dividend[i]) >= parseInt(divisor)) {                
                found = true;
            }
            aux+= dividend[i];            
            i++;
        }
        quotient += Math.floor(aux / divisor);
        dividend = parseInt(aux) - (parseInt(quotient[j]) * parseInt(divisor)) + dividend.slice(i);
        j++;
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
    let multiplicand = this;
    let multiplier = str;
    let aux = "";
    let result = "0";
    let current;
    let carry;

    for (let i = 1; i <= multiplier.length; i++) {
        carry = 0;
        for (let j = 1; j <= multiplicand.length; j++) {
            current = parseInt(multiplicand[multiplicand.length - j]) *
                      parseInt(multiplier[multiplier.length - i]) + 
                      carry; 
            carry = current > 9 ? Math.floor(current / 10) : 0;
            aux = current % 10 + aux;       
        }

        aux = carry > 0 ? carry + aux : aux;

        result = result.plus(aux); //I use my plus function
        
        aux = "";
        for (let k = 0; k < i; k++) { //I add zeros at the end of the aux variable 
            aux = aux + 0;
        }        
    }

    return result;
}

num1 = "999";
num2 = "99";
num3 = "8";
num4 = "25";

console.log("Multiply: " + num1.multiply(num2));
console.log("Multiply: " + num3.multiply(num4));