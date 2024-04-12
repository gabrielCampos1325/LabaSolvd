function addValues (x, y) {
    let answer = "The addValues function do not support the arguments data type";
    if (typeof x === "number" && typeof y === "number" ||
        typeof x === "bigint" && typeof y === "bigint" ||
        typeof x === "string" && typeof y === "string") {
        answer = x + y;
    }
    return answer;
}

console.log(addValues(1, 2));
console.log(addValues(3n, 4n));
console.log(addValues("5", "6"));
console.log(addValues(null, 1));


