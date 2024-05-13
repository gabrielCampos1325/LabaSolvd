//Task 1: Implement promiseAll Function
function promiseAll(arrOfPromises) {
    const answer = [];
    return new Promise((resolve, reject) => {
        arrOfPromises.forEach(element => {
            element.then(ans => {
                answer.push(ans);
                if (answer.length === arrOfPromises.length) {
                    resolve(answer);
                }
            }).catch(e => reject(e));
        });
    })
}

const promises1 = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3)
];

promiseAll(promises1)
    .then(results => {
        console.log("All promises resolved:", results); // Expected: [1, 2, 3]
    })
    .catch(error => {
        console.error("At least one promise rejected:", error);
});


//Task 2: Implement promiseAllSettled Function
function promiseAllSettled(arrOfPromises) {
    const answer = [];
    return new Promise((resolve) => {
        arrOfPromises.forEach((element, i) => {
            element.then(value => {
                answer[i] = { status: 'fulfilled', value};
            }).catch(reason => {
                answer[i] = { status: 'rejected', reason };
            }).finally(() => {
                if (answer.length === arrOfPromises.length) {
                    resolve(answer);
                }
            });            
        });
    });
}

const promises2 = [
    Promise.resolve(1),
    Promise.reject("Error occurred"),
    Promise.resolve(3)
];
  
promiseAllSettled(promises2)
    .then(results => {
    console.log("All promises settled:", results);
    // Expected: [{ status: 'fulfilled', value: 1 },
    //            { status: 'rejected', reason: 'Error occurred' },
    //            { status: 'fulfilled', value: 3 }]
});


//Task 3: Implement Chaining of Promises as a Separate Function
function chainPromises(arrOfPromises) {
    let answer = Promise.resolve();
    return new Promise((resolve) => {
        arrOfPromises.forEach(func => {
            answer = answer.then(result => func(result))
                           .catch(e => { throw new Error(e) });
        });
        resolve(answer);
    });   
}

function asyncFunction1() {
    return Promise.resolve("Result from asyncFunction1");
}
  
function asyncFunction2(data) {
    return Promise.resolve(data + " - Result from asyncFunction2");
}
  
function asyncFunction3(data) {
    return Promise.resolve(data + " - Result from asyncFunction3");
}
  
const functionsArray = [asyncFunction1, asyncFunction2, asyncFunction3];
  
chainPromises(functionsArray)
    .then(result => {
      console.log("Chained promise result:", result);
      // Expected: "Result from asyncFunction1 - Result from asyncFunction2 - Result from asyncFunction3"
    })
    .catch(error => {
      console.error("Chained promise error:", error);
    }
);


//Task 4: Implement promisify Function
function promisify(callback) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            callback(...args, (e, result) => {
                result ? resolve(result) : reject(e);
            })
        });
    };
}

function callbackStyleFunction(value, callback) {
    setTimeout(() => {
      if (value > 0) {
        callback(null, value * 2);
      } else {
        callback("Invalid value", null);
      }
    }, 1000);
}
  
const promisedFunction = promisify(callbackStyleFunction);
  
promisedFunction(3)
    .then(result => {
      console.log("Promised function result:", result); // Expected: 6
    })
    .catch(error => {
      console.error("Promised function error:", error);
    });