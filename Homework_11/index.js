function myJSONParse(str) {    

    // Parses a JSON string from the string.
    function parseString() {
        const match = rString.exec(str);
        if (match) {
            str = str.slice(match[0].length); // remove matched string
            return match[0].trim().slice(1, -1); // remove quotes
        }
        throw new Error ("Unexpected string format");
    }

    // Parses a JSON number from the string.
    function parseNumber() {
        const match = rNumber.exec(str);
        if (match) {
            str = str.slice(match[0].length); // remove matched number
            return Number(match[0].trim());
        }
        throw new Error ("Unexpected number format");
    }

    // Parses a JSON boolean from the string.
    function parseBoolean() {
        const match = rBoolean.exec(str);
        if (match) {
            str = str.slice(match[0].length); // remove matched boolean
            return match[0].trim() === 'true';
        }
        throw new Error ("Unexpected boolean format");
    }

    // Parses a JSON null from the string.
    function parseNull() {
        const match = rNull.exec(str);
        if (match) {
            str = str.slice(match[0].length); // remove matched null
            return null;
        }
        throw new Error ("Unexpected null format");
    }

    // Parses a JSON array from the string.
    function parseArray() {
        let answer = [];
        str = str.trim().slice(1); // remove opening '['
        while (!/^\s*\]/.test(str)) {
            let value = checkCase();
            answer.push(value);
            str = str.trim();
            if (/^\s*,/.test(str)) {
                str = str.trim().slice(1); // remove ','
            }
        }
        str = str.trim().slice(1); // remove closing ']'
        return answer;
    }

    // Parses a JSON object from the string.
    function parseObject() {
        let answer = {};
        str = str.trim().slice(1); // remove opening '{'
        while (!/^\s*\}/.test(str)) {
            let key = parseString();
            str = str.trim().slice(1); // remove ':'
            let value = checkCase();
            answer[key] = value;
            str = str.trim();
            if (/^\s*,/.test(str)) {
                str = str.trim().slice(1); // remove ','
            }
        }
        str = str.trim().slice(1); // remove closing '}'
        return answer;
    }

    // Determines the type of the next value in the string and calls the appropriate parsing function.
    function checkCase() {
        if (rObject.test(str)) {
            return parseObject();
        } 
        else if (rArray.test(str)) {
            return parseArray();
        } 
        else if (rString.test(str)) {
            return parseString();
        } 
        else if (rNumber.test(str)) {
            return parseNumber();
        } 
        else if (rBoolean.test(str)) {
            return parseBoolean();
        } 
        else if (rNull.test(str)) {
            return parseNull();
        } 
        else {
            throw new Error ("Unexpected token: " + str[0]);
        }
    } 

    // Regular expressions for different JSON types
    const rString = /^\s*"((\\")|[^"])+"|^\s*""/; // matches a string, accounting for escaped quotes
    const rNumber = /^\s*-?\d+(\.\d+)?([eE][+-]?\d+)?/; // matches a number (integer or floating-point)
    const rBoolean = /^\s*(true|false)/; // matches a boolean (true or false)
    const rNull = /^\s*null/; // matches the null value    
    const rObject = /^\s*\{/; // matches the beginning of an object
    const rArray = /^\s*\[/; // matches the beginning of an array 

    return checkCase();
}

// Testing the function
console.log(myJSONParse('{"name": "Gabriel", "age": 28, "isStudent": true, "grades": [7.5, 9, 7.8], "address": {"city": "La Plata", "zip": "1900", "direction": {"street": 159, "number": 567, "dpt": "7A"}}, "nullValue": null}'));

/*
Reflect:
This task was very educational. I thought I knew the topic well, but I encountered
certain difficulties, which required me to delve deeply into the documentation. My 
biggest challenge was dealing with nested structures; to address this, I reviewed 
previous university exercises and read additional materials.
*/