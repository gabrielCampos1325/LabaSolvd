function customFilterUnique(arr, callbackFunction) {
    let uniqueElements = new Set();
    arr.forEach(element => {
        const x = callbackFunction(element);
        if (!uniqueElements.has(x)) {
            uniqueElements.add(x);            
        } else {
            uniqueElements.delete(x);
        }
    });
    return [...uniqueElements];
}

/* const books = [
    { name: "Frankestein", year: 1925 },
    { name: "Harry Potter", year: 1960 },
    { name: "El Fausto", year: 1949 },
    { name: "The wolf", year: 1960 },
    { name: "Harry Potter", year: 1960 }    
];
console.log(customFilterUnique(books, e => e.year));
const teachers = [
    {name: 'Tomas'},
    {name: 'Tomas'},
    {name: 'Ilya'},
    {name: 'Alexandrina'}
];
console.log(customFilterUnique(teachers, e => e.name)); */


function chunkArray(arr, chunkSize) {
    let answer = [];
    let i = 0;
    while (i < arr.length) {
        answer.push(arr.slice(i, i + chunkSize));
        i += chunkSize;
    }
    return answer;
}

/* const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(JSON.stringify(chunkArray(arr, 2))); */


function customShuffle(arr) {
    let answer = new Array(arr.length).fill(null);
    let i;    
    arr.forEach(element => {
        i = Math.floor(Math.random() * arr.length);
        while (answer[i] !== null) { 
            i = (i + 1) % arr.length; 
        }
        answer[i] = element;       
    });
    return answer;
}

/* const arrOfStrings = ["car", "kitchen", "dog", "blue"];
console.log(customShuffle(arrOfStrings));
console.log(arrOfStrings);
const arrOfNumbers = [11, 12, 13, 14, 15];
console.log(customShuffle(arrOfNumbers));
console.log(arrOfNumbers); */


function getArrayIntersection(arr1, arr2) {
    const set1 = new Set(arr1);
    return arr2.filter(e => set1.has(e));    
}

function getArrayUnion(arr1, arr2) {
    let bothArrays = [...arr1, ...arr2];  
    let uniqueArray = new Set(bothArrays);    
    return [...uniqueArray];
}

/* const arr1 = [1, 2, 3, 4, 5, 6, 7, 8];
const arr2 = [3, 4, 5, 6, 45, 68];
console.log(getArrayIntersection(arr1, arr2));
console.log(getArrayUnion(arr1, arr2)); */


function measureArrayPerformance(arr, fun) {
    const startTime = performance.now();
    fun(arr);
    const endTime = performance.now();
    console.log("The execution time is: " +
    (endTime - startTime) + 
    " milliseconds");
}

function customMap(arr, callbackFunction) {
    let answer = [];
    for (let i = 0; i < arr.length; i++) {
        answer.push(callbackFunction(arr[i]))
    }
    return answer;
}

/* const mapArray = [1, 2, 3, 4, 5];
measureArrayPerformance(mapArray, arr => arr.map(e => e * e));
measureArrayPerformance(mapArray, arr => customMap(arr, e => e * e)); */

function customFilter(arr, callbackFunction) {
    let answer = [];
    for (let i = 0; i < arr.length; i++) {
        if (callbackFunction(arr[i])) {
            answer.push(arr[i]);
        }      
    }
    return answer;
}

/* const filterArray = [1, 2, 3, 4, 5];
measureArrayPerformance(filterArray, arr => arr.filter(e => e % 2 === 0));
measureArrayPerformance(filterArray, arr => customFilter(arr, e => e % 2 === 0)); */

function customReduce(arr, callbackFunction, initialValue) {
    let answer;
    let i = 0;
    if (initialValue !== undefined) {
        answer = initialValue;
    } else {
        answer = arr[0];
        i = 1;
    }
    for (i ; i < arr.length; i++) {
        answer = callbackFunction(answer, arr[i]);      
    }
    return answer;
}

/* const reduceArray = [1, 2, 3, 4, 5];
measureArrayPerformance(reduceArray, arr => arr.reduce((acc, num) => acc * num, 1));
measureArrayPerformance(reduceArray, arr => customReduce(arr, (acc, num) => acc * num, 1)); */