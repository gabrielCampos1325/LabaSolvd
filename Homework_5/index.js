function customFilterUnique(arr, callbackFunction) {
    let answer = [];
    let uniqueElements = new Set();
    arr.forEach(element => {
        if (!uniqueElements.has(element) && callbackFunction(element)) {
            uniqueElements.add(element);
            answer.push(element);
        }
    });
    return answer;
}


function chunkArray(arr, chunkSize) {
    let answer = [];
    let i = 0;
    while (i < arr.length) {
        answer.push(arr.slice(i, i + chunkSize));
        i += chunkSize;
    }
    return answer;
}


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


function getArrayIntersection(arr1, arr2) {
    let answer = [];
    arr1.forEach(e => {
        arr2.forEach(e2 => {
            if (e === e2) {
                answer.push(e);
            }
        });
    });
    return answer;
}
function getArrayIntersection2(arr1, arr2) {
    const set1 = new Set(arr1);
    return arr2.filter(e => set1.has(e));    
}

function getArrayUnion(arr1, arr2) {
    let bothArrays = [...arr1, ...arr2];  
    let uniqueArray = [...new Set(bothArrays)];    
    return uniqueArray;
}


function measureArrayPerformance(arr, funct) {
    const startTime = performance.now();
    funct(arr);
    const endTime = performance.now();
    console.log("The execution time is: " +
    endTime - startTime + 
    " milliseconds");
}