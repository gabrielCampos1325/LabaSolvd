const calculateDiscountedPrice = function(products, discount) {
    discount = discount / 100;
    return products.map(e => {
        return {...e, price: e.price - (e.price * discount)}
    });
}
/*
let products = [{name: "milk", price: 5},
                {name: "sugar", price: 4},
                {name: "flour", price: 6},
                {name: "butter", price: 9},
                {name: "yeast", price: 1}];
let discount = 15; 
console.log(JSON.stringify(calculateDiscountedPrice(products, discount)));
 */

const calculateTotalPrice = function(products) {
    let total = 0;
    products.forEach(e => total += e.price);
    return total;
}
/* 
console.log(calculateTotalPrice(products));
 */

const getFullName = function(person) {
    return person.firstName + ' ' + person.lastName;
}
/* 
console.log(getFullName({firstName: "Gabriel", lastName: "Camposs"}));
 */

const separateWords = txt => txt.split(" ");
const filterDuplicates = words => [...new Set(words)];
const sortWords = words =>  [...words].sort();
/* 
console.log(sortWords(filterDuplicates(separateWords("Hello word Hello"))));
 */

const createCounter = () => {
    let count = 0;
    return () => count++;
}
    
const firstCount = createCounter();
const secondCount = createCounter();
/* console.log(firstCount());
console.log(secondCount()); */


const repeatFunction = function(f, n) {
    if (n >= 0) {
        return () => {
            for (let index = 0; index < n; index++) {
                f();               
            }
        }
    } else {
        return () => {
            while (true) {
                f();
            }
        }
    }
}

/* repeatFunction(() => {console.log("Gabriel Campos")}, 4)();
repeatFunction(() => {console.log("Gabriel Campos")}, -1)(); */


function calculateFactorial(n) {
    if (n > 0) {
        return n * calculateFactorial(n - 1);
    } else {
        return 1;
    }
}
/* 
console.log(calculateFactorial(5)); */


function power(base, exponent) {
    if (exponent === 0) return 1;
    
    if (exponent > 1) {
        return base * power(base, exponent - 1)
    } else {
        return base;
    }
}
/* 
console.log(power(2, 3)); */




