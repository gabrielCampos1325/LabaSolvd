function addValues(x, y) {
    if (typeof x === "number" && typeof y === "number" ||
        typeof x === "bigint" && typeof y === "bigint" ||
        typeof x === "string" && typeof y === "string") {
        return x + y;
    } else {
        throw new Error("The addValues function do not support the arguments data type");
    }
}

/* console.log(addValues(1, 2));
console.log(addValues(3n, 4n));
console.log(addValues("5", "6"));
console.log(addValues(null, 1)); */


function stringifyValue(x) {
    let answer = String(x);;
    if (x !== null && 
        typeof x === "object" ||
        Array.isArray(x)) {
        answer = JSON.stringify(x);
    }
    return answer;
}

/* console.log(stringifyValue(null));
console.log(stringifyValue([1, 2]));
console.log(stringifyValue({make: "Ford", model: "Mustang", year: 1969})); */


function invertBoolean(x) {
    if (typeof(x) === "boolean") {
        return !x;
    }
    else {
        throw new Error("The invertBoolean function only support boolean argument");
    }
}

/* console.log(invertBoolean(true));
console.log(invertBoolean([false])); */


function convertToNumber(x) {
    const argType = typeof(x);
    let answer;
    switch(argType){
        case "string" :
            if (x.includes(".")){
                answer = parseFloat(x);
            } else {
                if (x.includes(",")) {
                    answer = parseFloat(x.replace(",", "."));
                } else {
                    answer = parseInt(x);
                }
            }            
            break;
        case "boolean" :
            x ? answer = 1 : answer = 0;
            break;
        case "number" :
            answer = x;
            break;
        case "bigint" :
            if (x >= Number.MIN_SAFE_INTEGER && x <= Number.MAX_SAFE_INTEGER) {
                answer = Number(x);
            } else {
                throw new Error("The argument is out of range so the conversion will not be safe");
            }
            break;
        default :
            throw new Error("The convertToNumber function do not support the arguments data type");
    }
    return answer;
}

/* console.log(convertToNumber("134"));
console.log(convertToNumber("107.5"));
console.log(convertToNumber("130,5"));
console.log(convertToNumber(true));
console.log(convertToNumber(false));
console.log(convertToNumber(42));
console.log(convertToNumber(42n)); */


function coerceToType(value, type) {
    let answer;
    switch(type) {
        case "null" :
            answer = null;
            break;
        case "undefined" :
            answer = undefined;
            break;
        case "boolean" :
            try {
                answer = Boolean(value);
            } catch(e) {
                throw new Error("The argument can not be converted to Boolean type")
            }
            break;
        case "number" :
            answer = convertToNumber(value);
            break;
        case "bigint" :
            try {
                answer = BigInt(value);
            } catch(e) {
                throw new Error("The argument can not be converted to BigInt type")
            } 
            break;
        case "string" :
            answer = stringifyValue(value);   
            break;    
        case "object":            
            try {
                answer = JSON.parse(value);
            } catch(e) {
                throw new Error("The argument can not be converted to JSON object");
            }            
            break;
        default:
            throw new Error("Unsupported type: " + type);
    }
    return answer;
}

/* console.log(coerceToType(undefined, "number"));
console.log(coerceToType(null, "string")); 
console.log(coerceToType("true", "boolean"));
console.log(coerceToType("1.4557", "number")); 
console.log(coerceToType("9007199254740993", "bigint")); 
console.log(coerceToType(1164, "string")); 
console.log(coerceToType('{"result":true, "count":42}', "object")); */ 


//This function convert a boolean input to YES or NO
function convertToYesOrNo(value) {
    return value ? "YES" : "NO";
}

/* console.log(convertToYesOrNo(true));
console.log(convertToYesOrNo(false)); */


//This function converts RGB color to hexadecimal
function convertToHexadecimal(r, g, b) {
    let answer = "#";
    let arr = [];
    let actual;
    arr.push(r);
    arr.push(g);
    arr.push(b);
    arr.forEach(e => {
        actual = e.toString(16);
        answer += actual.length === 1 ? "0" + actual : actual;
    });
    return answer;
}

/* console.log(convertToHexadecimal(255, 4, 14)); 
console.log(convertToHexadecimal(0, 255, 255)); */


//This function converts a binary input to decimal number
function convertToBaseTen(x) {
    return parseInt(x, 2)
}

/* console.log(convertToBaseTen("111"));
console.log(convertToBaseTen("100")); */