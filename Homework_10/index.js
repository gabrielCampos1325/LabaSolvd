//HashTable class for storing key-value pairs with my custom hashing function and linear probing collision resolution.
class HashTable {
    constructor() {
        // Number of actual elements in the hash table
        this.logicalDimension = 0;
        // Total number of slots in the hash table
        this.physicalDimension = 100;
        // Threshold for resizing the hash table
        this.packingDensity = 0.75;
        // Array to store key-value pairs
        this.table = new Array(this.physicalDimension);      
    }
    
    hash(key) {
        let result = 0;
        // Sum the Unicode values of each character in the key
        for (let i = 0; i < key.length; i++) {
            const unicodeValue = key.charCodeAt(i) % 11; // Modulo 11 to limit the range
            result += unicodeValue;
        }
        return result;
    }

    //Resize the hash table by doubling its size and rehashing all key-value pairs
    resize() {
        const newSize = this.fisicalDimension * 2; // Double the size of the array
        const newTable = new Array(newSize);
    
        // Rehash all key-value pairs into the new array
        for (let i = 0; i < this.table.length; i++) {
            if (this.table[i] !== undefined) {
                let [key, value] = this.table[i];
                let newIndex = this.hash(key) % newSize;

                // Linear probing to find the next empty slot in the new array
                while (newTable[newIndex] !== undefined) {
                    newIndex = (newIndex + 1) % newSize;
                }    
                newTable[newIndex] = [key, value];
            }
        }    
        this.table = newTable;
        this.fisicalDimension = newSize;
    }
    

    insert(key, value) {
        // Check if the hash table needs to be resized
        if (this.logicalDimension / this.fisicalDimension > this.packingDensity) {
            this.resize();
        }
        let index = this.hash(key);
        // Linear probing to handle collisions
        while (this.table[index] !== undefined) {
            if (this.table[index][0] === key) { // Update existing key
                this.table[index][1] = value;
                return;
            }
            index = (index + 1) % this.table.length; // Linear probing
        }
        this.table[index] = [key, value];
        this.logicalDimension++;
    }

    get(key) {
        let index = this.hash(key);
        // Linear probing to find the key
        while (this.table[index] !== undefined) {
            if (this.table[index][0] === key) {
                return this.table[index][1];
            }
            index = (index + 1) % this.table.length;
        }
        return undefined;
    }

    //Delete a key-value pair from the hash table.
    delete(key) {
        let index = this.hash(key);
        while (this.table[index] !== undefined) {
            if (this.table[index][0] === key) {
                this.table.splice(index, 1); // Remove element at index
                this.logicalDimension--;
                return true; // Key deleted successfully
            }
            index = (index + 1) % this.table.length; // Linear probing
        }
        return false; // Key not found
    }
}

// Example usage:
const hashTable = new HashTable();
hashTable.insert("house", 123);
hashTable.insert("sehou", 456); // This will cause a collision
console.log(hashTable.get("house")); // Output: 123
console.log(hashTable.get("sehou")); // Output: 456

console.log(hashTable.delete("sehou"));
console.log(hashTable.get("sehou")); // Output: undefined

/* 
Performance Analysis:

Custom Hash Function: The custom hash function sums the Unicode values of each character in the key and takes the modulo 11 to 
limit the range of values. This function has a time complexity of O(n) where n is the length of the key, as it iterates over 
each character in the key.

Hash Table Operations:

Insertion: In the worst case, when there are many collisions, the time complexity of insertion can be O(n), where n is the number 
of elements in the hash table. This is because linear probing may require traversing the entire table to find an empty slot.

Retrieval: Similar to insertion, the worst-case time complexity for retrieval can be O(n) due to linear probing.

Deletion: Deletion has a worst-case time complexity of O(n) for similar reasons as insertion and retrieval.

Trade-offs:

Collision Resolution: The choice of linear probing for collision resolution its because is simple and easy to understand but can lead
to a degraded performance, especially under high loads. Other collision resolution techniques like quadratic probing or chaining could 
be considered for better performance in high loads scenarios.

Resize Threshold: The choice of a packing density of 0.75 for resizing the hash table balances memory usage and performance. A lower 
packing density would result in more frequent resizes but lower memory usage, while a higher packing density would reduce resizes but 
increase the probability of collisions.
 */