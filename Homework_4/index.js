const person = {};

Object.defineProperties(person, {
    firstName: {
        value: "John",
        enumerable: true
    },
    lastName: {
        value: "Doe",
        enumerable: true
    },
    age: {
        value: 30,
        enumerable: true
    },
    email: {
        value: "john.doe@example.com",
        enumerable: true
    }
});

Object.defineProperty(person, "updateInfo", {
    value: function(newInfo) {
        for (let key in newInfo) {
            if (this.hasOwnProperty(key) &&
                Object.getOwnPropertyDescriptor(this, key).writable) {
                this[key] = newInfo[key];            
            }
        }
    },
    writable: true,
    enumerable: false
});

Object.defineProperty(person, "address", {
    value: "",
    writable: true,
    enumerable: true
});

/* console.log("Before update: ");
console.log(person);

let personInfo = {
    firstName: 'Gabriel',
    lastName: 'Campos',
    age: 23,
    email: 'gabriel@gmail.com',
    address: 'La Plata, Bs As'
};

console.log("After update:");
person.updateInfo(personInfo);
console.log(person); */


const product = {};

Object.defineProperties(product, {
    name: {
        value: "Laptop",
        enumerable: true
    },
    price: {
        value: 1000,
    },
    quantity: {
        value: 5,
    },
    year: {
        value: 2020,
        enumerable: true,
        configurable: true
    }
});

const getTotalPrice = function(product) {
    const priceDescriptor = Object.getOwnPropertyDescriptor(product, "price");
    const quantityDescriptor = Object.getOwnPropertyDescriptor(product, "quantity");
    if (priceDescriptor && quantityDescriptor) {
        return priceDescriptor.value * quantityDescriptor.value;
    } else {
        throw new Error("The total price can not be calculated. The price and quantity properties are required");
    }    
}

const deleteNonConfigurable = function (product, propName) {
    if (product.hasOwnProperty(propName)) {
        const propDescriptor = Object.getOwnPropertyDescriptor(product, propName);
        if (propDescriptor.configurable) {
            delete product[propName];
        } else {
            throw new Error("The specified property can not be deleted");
        }
    } 
}

/* console.log("Before delete: ");
console.log(product);
console.log("The total price is: " + getTotalPrice(product));
deleteNonConfigurable(product, "year");
console.log("After delete: ");
console.log(product); */


const bankAccount = {
    _balance: 1000,
    get formattedBalance() {
        return "$" + this._balance;
    },
    get balance() {
        return this._balance;
    },
    set balance(newBalance) {
        this._balance = newBalance;
    },
    transfer(target, amount) {
        if (this._balance >= amount) {
            this._balance -= amount;
            target.balance += amount;
        } else {
            throw new Error("The specified amount can not be transfered. Insufficient funds");
        }
    }
}

/* const primaryAccount = Object.create(bankAccount);
const secondAccount = Object.create(bankAccount);
primaryAccount.transfer(secondAccount, 300);
console.log(primaryAccount.formattedBalance);
console.log(secondAccount.formattedBalance); */


const createImmutableObject = function(target) {
    const answer = {};
    for (let key in target) {
        if (typeof target[key] === "object") {
            answer[key] = createImmutableObject(target[key]); 
        } else {
            Object.defineProperty(answer, key, {
                value: target[key],
                writable: false,
                enumerable: true,
                configurable: false
            });
        }
    }
    return answer;
}

/* const immutObj = createImmutableObject(person);
console.log(Object.getOwnPropertyDescriptors(immutObj)); */


const observeObject = function(obj, callBackFunction) {    
    const answer = {};
    for (let key in obj) {
        Object.defineProperty(answer, key, {
            get: function() {
                callBackFunction(key, "get");
                return obj[key];
            },
            set: function(newValue) {
                callBackFunction(key, "set");
                obj[key] = newValue;
            }
        })
    }
    return answer;    
}

/* const callBackFunction = (prop, action) => console.log(action + " " + prop);
const proxyPerson = observeObject(person, callBackFunction);
console.log(proxyPerson.age); */


const deepCloneObject = function(target) {
    let answer = {};
    for (let key in target) {
        if (typeof target[key] === "object") {
            answer[key] = deepCloneObject(target[key]); 
        } else {
            const propDescriptor = Object.getOwnPropertyDescriptor(target, key);
            Object.defineProperty(answer, key, {
                value: target[key],
                writable: propDescriptor.writable,
                enumerable: propDescriptor.enumerable,
                configurable: propDescriptor.configurable
            });
        }
    }
    return answer;
}


const validateObject = function(obj, schema) {
    for (let key in schema) {
        if (!Object.hasOwnProperty(obj, key)) {
            return false;         
        }
        if (schema[key].type !== typeof obj[key]) {
            return false;  
        }
        if (key === "window" &&
            schema[key].minQuantity >= obj[key]) {
            return false;  
        }
        if (key === "door" &&
            schema[key].color !== obj[key]) {
            return false;  
        }           
    }
    return true;
}

const houseSchema = {
    window: {
        type: "number",
        minQuantity: 3
    },
    door: {
        type: "string",
        color: "grey"
    },
    firePlace: {
        type: "boolean"        
    }
}

const house = {
    window: 5,
    door: "blue",
    firePlace: true
}

/* console.log(validateObject(house, houseSchema)); */
