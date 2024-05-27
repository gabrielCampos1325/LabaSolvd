// Part 1: Data Structure Implementations

//A stack uses the principle of Last In First Out
class Stack {
    //Creates a new stack instance whit an intern and empty array	
	constructor() {
		this.data = [];
	}
	
    //Adds a new element to to top of the stack
	push(elem) {
		this.data.push(elem);
	}
	
    //Removes and returns the top element of the stack
	pop() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty. Cannot pop.");
        }
        const elem = this.peek();
        this.data.pop();
        return elem;	
	}
	
    //It shows the top element of the stack without removing it
	peek() {
        if (!this.isEmpty()) {
		    return this.data[this.data.length - 1];
        }
        return null;
	}
	
    //Checks if the stack is empty
	isEmpty() {
		return this.data.length == 0;
	}
}

//A queue uses the principle of First In First Out
class Queue {	
    //Creates a new queue instance whit an intern and empty array	
	constructor(){
		this.data = [];
	}
	
    //Adds an element to the end of the queue
	enqueue(elem) {
		this.data.push(elem);
	}
	
    //Removes and returns the first element from the queue
	dequeue() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
		const elem = this.peek();
		this.data.splice(0, 1);
		return elem;
	}
	
    //Returns the first element in the queue without removing it
	peek() {
		if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        return this.data[0];
	}
	
    //Checks if the queue is empty
	isEmpty() {
		return this.data.length == 0;
	}
}

//A binary tree is a structure that has nodes and each node can have 0, 1 or 2 childrens(node). One of them is called root.
class BinaryTree {
    //Creates a new BinaryTree node
    constructor(data) {
        this.data = data;
        this.leftChild = null;
        this.rightChild = null;
    }

    //Gets the data stored in the node
    getData() {
        return this.data;
    }

    //Sets the data stored in the node
    setData(data) {
        this.data = data;
    }

    //Gets the left child of the node
    getLeftChild() {
        return this.leftChild;
    }

    //Gets the right child of the node
    getRightChild() {
        return this.rightChild;
    }

    //Sets the left child of the node
    setLeftChild(son) {
        this.leftChild = son;
    }

    //Sets the right child of the node
    setRightChild(son) {
        this.rightChild = son;
    }

    //Checks if the node has a left child
    hasLeftChild() {
        return this.leftChild != null;
    }

    //Checks if the node has a right child
    hasRightChild() {
        return this.rightChild != null;
    }

    // Checks if the node is a leaf node (has no children)
    isLeaf() {
        return this.leftChild == null &&
        this.rightChild == null;
    }

    //Internal method for searching a node with a given data value
    _search(data, ok) {
        let answer = null;
        if (this.data == data) {
            answer = this;
            ok = true;
        } else {
            if (this.hasLeftChild()) {
                answer = this.leftChild._search(data, ok);  
            }          
            if (!ok && this.hasRightChild()) {
                answer = this.rightChild._search(data, ok);                
            }            
        }
        return answer;
    }

    //Searches for a node with a given data value in the tree
    search(data) {
        return this._search(data, false);
    }

    //Performs a pre-order traversal of the tree, visiting the root, then the left subtree, then the right subtree.
    preOrder() {
        console.log(this.data);
        if (this.hasLeftChild()) {
            this.leftChild.preOrder();
        }
        if (this.hasRightChild()) {
            this.rightChild.preOrder();
        }
    }

    //Performs an in-order traversal of the tree, visiting the left subtree, then the root, then the right subtree.
    inOrder() {        
        if (this.hasLeftChild()) {
            this.leftChild.inOrder();
        }
        console.log(this.data);
        if (this.hasRightChild()) {
            this.rightChild.inOrder();
        }
    }

    //Performs a post-order traversal of the tree, visiting the left subtree, then the right subtree, then the root.
    postOrder() {        
        if (this.hasLeftChild()) {
            this.leftChild.postOrder();
        }        
        if (this.hasRightChild()) {
            this.rightChild.postOrder();
        }
        console.log(this.data);
    }    
}

//This is a class used by the graph
class Edge {
    // Initialize the destiny vertex and weight of the edge
    constructor(destiny, w = 0) {
        this._destinyVertice = destiny;
        this._weight = w;
    }

    // Getter method for the destiny vertex
    destinyVertice() {
		return this._destinyVertice;
	}

    // Getter method for the weight of the edge
    weight() {
		return this._weight;
	}
}

//This is a class used by the graph
class Vertice {
    // Initialize the data of the vertex, position in the graph, and adjacent vertices
    constructor(d) {
        this._data = d;
        this.position;
        this.adjacents = new LinkedList();
    }

    // Getter method for the data of the vertex
    data() {
        return this._data;
    }

    // Setter method for the data of the vertex
    setData(data) {
        this._data = data;
    }

    // Getter method for the position of the vertex in the graph
    getPosition() {
        return this.position;
    }

    // Getter method for the list of adjacent vertices
    getAdjacents() {
        return this.adjacents;
    }

    // Get an edge (if it exists) connecting this vertex to another vertex
    getArista(v) {
        let edge = null;
        let auxEdge;
        this.adjacents.start();
        while (!this.adjacents.end()) {
            auxEdge = this.adjacents.next();
            if (auxEdge.destinyVertice() == v) {
                edge = auxEdge;
            }
        }
        return edge;
    }

    // Connect this vertex to another vertex if graph has no weight
    connect(v) {
        this.connectWW(v, 1);
    }

    // Connect this vertex to another vertex with a specified weight
    connectWW(v, weight) {
        let arista = this.getArista(v);

        if (arista == null) {
            let a = new Edge(v, weight);
            this.adjacents.addtoEnd(a);
        }
    }

    // Check if this vertex is adjacent to another vertex
    isAdjacent(v) {
        let edge = getArista(v);
        return edge != null;
    }

    // Get the weight of the edge connecting this vertex to another vertex
    weight(v) {
        let edge = this.getArista(v);

        let ret = 0;
        if (edge != null) {
            ret = edge.weight();
        }

        return ret;
    }

    // Set the position of the vertex in the graph
    setPosition(pos) {
        this.position = pos;
    }

}

class Graph {
    // Initialize the list of vertices in the graph
    constructor() {
        this.vertices = new LinkedList();
    }

    // Add a vertex to the graph
    addVertice(v) {
		if(!this.vertices.includes(v)){
		    this.vertices.addtoEnd(v);
			v.setPosition(this.vertices.getSize());
		}
	}

    // Connect two vertices in the graph with a default weight of 1
    connect(origin, destiny) {
		origin.connect(destiny);
	}

    // Connect two vertices in the graph with a specified weight
    connect(origin, destiny, weight) {
		origin.connect(destiny, weight);
	}

    // Get the list of adjacent vertices for a given vertex
    adjacentsList(v){
		return v.getAdjacents();
	}

    // Depth-first search traversal of the graph
    _dfs(i, answer, marca) {
        marca[i] = true;
		const v = this.vertices.element(i);
		answer.addtoEnd(v);
		let ady = this.adjacentsList(v);
		ady.start();
		while (!ady.end()) {
			let j = ady.next().destinyVertice().getPosition();
			if (!marca[j])
				this._dfs(j, answer, marca);
		}
    }

    // Depth-first search traversal of the entire graph
    dfs() {
        const marca = new Array(this.vertices.getSize() + 1);
        const answer = new LinkedList();
        for (let i = 1; i <= this.vertices.getSize(); i++) {
            if (!marca[i]) {
                this._dfs(i, answer, marca);
            }       
        }
        return answer;
    }

    // Breadth-first search traversal of the graph
    _bfs (i, answer, marca) {
		let ady = null;
		const q = new Queue();
		q.enqueue(this.vertices.element(i));
		marca[i] = true;
		while(!q.isEmpty()) {
			let v = q.dequeue();
			answer.addtoEnd(v);
			ady = this.adjacentsList(v);
			ady.start();
			while(!ady.end()) {
				let arista = ady.next();
				let j = arista.destinyVertice().getPosition();
				if (!marca[j]) {
					let w = arista.destinyVertice();
					marca[j] = true;
					q.enqueue(w);
				}
			}
		}		
	}

    // Breadth-first search traversal of the entire graph
    bfs() {
		const marca = new Array(this.vertices.getSize() + 1);
		const answer = new LinkedList();
		for (let i = 1; i <= this.vertices.getSize(); i++) {
			if (!marca[i])
				this._bfs(i, answer, marca);
		}
		return answer;
	}
}

//This is a class used by the linked list. Creates a new node with the given data
class Node {
    //Creates a new node
    constructor(){
        this.data = null;
        this.next = null;
    }	
	
    //Gets the data stored in the node
    getData() {
		return this.data;
	}

    //Sets the data to be stored in the node
	setData(data) {
		this.data = data;
	}

    //Gets the next node in the linked list
	getNext() {
		return this.next;
	}

    //Sets the next node in the linked list.
	setNext(next) {
		this.next = next;
	}
}

//Represents a singly linked list.
class LinkedList {
    //Creates a new empty linked list
    constructor() {
        this.startNode = null;
        this.actual = null;
        this.endNode = null;
        this.size = 0;
    }

    //Sets the actual node to the start node of the linked list
    start(){
        this.actual = this.startNode;
    }

    //Moves the actual node to the next node in the linked list and returns the data of the current node
    next() {
        const aux = this.actual.getData();
        this.actual = this.actual.getNext();
        return aux;
    }

    //Gets the data at the specified position in the linked list
    element(pos) {
		if (pos < 1 || pos > this.getSize()) 
			return null;
		let n = this.startNode;
		while (pos-- > 1)
			n = n.getNext();
		return n.getData();
	}

    //Checks if the actual node is at the end of the linked list
    end(){
        return this.actual == null;
    }

    //Inserts a new node with the given data at the specified position in the linked list
    addIn(elem, pos){
        if (pos < 1 || pos > this.size + 1)
			return false;
		this.size++;
		let aux = new Node();
		aux.setData(elem);
		if (pos == 1) {
			aux.setNext(this.start);
			this.start = aux;
			//If it is the first element I fix the end
			if (this.size == 1){
				this.endNode = this.startNode;
			}
		} else {
			let n = this.startNode;
			let ant = null;
			let actualPos = 1;
			while (!(n == null) && (actualPos < pos)) {
				ant = n;
				n = n.getNext();
				actualPos++;
			}
			aux.setNext(n);
			ant.setNext(aux);
			//New
			if (aux.getNext() == null)
				this.endNode = aux;
		}
		return true;
    }

    //Inserts a new node with the given data at the beginning of the linked list
    addToStart(elem) {
		this.addIn(elem, 1);
		return true;
	}

    //Deletes the first occurrence of a node with the given data from the linked list
    delete(elem) {
		let n = this.start;
		let prev = null;
		while ((n != null) && (!n.getData().equals(elem))) {
			prev = n;
			n = n.getNext();
		}
		if (n == null)
			return false;
		else {
			if (prev == null)
				this.start = this.start.getNext();
			else
                prev.setNext(n.getNext());
			this.size--;

			return true;
		}
	}

    //Checks if the linked list is empty
    isEmpty() {
		return (this.startNode == null);
	}

    //Inserts a new node with the given data at the end of the linked list
    addtoEnd(elem) {
		let aux = new Node();
		aux.setData(elem);
		if (this.startNode == null) {
			this.startNode = aux;
			this.endNode = aux;
		} else {
			this.endNode.setNext(aux);
			this.endNode = aux;
		}
		this.size++;
		return true;
	}

    //Checks if the linked list contains a node with the given data
	includes(elem) {
		let n = this.startNode;
		while (!(n == null) && !(n.getData() == elem))
			n = n.getNext();
		return !(n == null);
	}

    //Gets the number of nodes in the linked list
	getSize() {
		return this.size;
	}
}


// Part 2: Algorithmic Problems

//MinMaxStack class that support retrieving the minimum and maximum values efficiently
class MinMaxStack {
    constructor() {
        this.data = new Stack();
        this.min = new Stack();
        this.max = new Stack();
    }

    //Pushes a value onto the stack and updates the min and max stacks
    push(elem) {
        this.data.push(elem);
        if (this.min.isEmpty() || elem <= this.min.peek()) {
            this.min.push(elem);
        }
        if (this.max.isEmpty() || elem >= this.max.peek()) {
            this.max.push(elem);
        }
    }

    //Pops a value from the stack and updates the min and max stacks
    pop() {
        const elem = this.data.peek();
        this.data.pop();
        this.min.pop();
        this.max.pop();
        return elem;
    }

    //Gets the minimum value in the stack
    //time complexity is constant
    getMin() {
        if (!isEmpty()) {
            return this.min.peek(); 
        }       
    }

    //Gets the maximum value in the stack
    //time complexity is constant
    getMax() {
        if (!isEmpty()) {
            return this.max.peek(); 
        }
    }

    //Checks if the main stack is empty
    isEmpty() {
        return this.data.isEmpty();
    }
}

//This function isBST is used to determine if a binary tree is a binary search tree (BST).
//It takes a node as input, along with optional min and max values to keep track of the 
//valid range for the node values in the subtree rooted at node.
//Time complexity is log(n). It does a binary search.
function isBST(node, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
    //Base case: an empty subtree is a valid BST
    if (node === null) {
        return true;
    }    
    //Check if the current node's value is within the valid range
    let aux = true;    
    if (node.getData() < min || node.getData() > max) {
        return false;
    }    
    //Recursively check the left subtree
    if (node.hasLeftChild()) {
        aux = isBST(node.getLeftChild(), min, node.getData() - 1);
    }   
    // Recursively check the right subtree 
    if (aux && node.hasRightChild()) {
        aux = isBST(node.getRightChild(), node.getData() + 1, max);
    }
    return aux;
}

//Dijkstra's algorithm to find the shortest path between two vertices
class PriorityQueue {
    constructor() {
        this.data = [];
    }

    enqueue(priority, value) {
        this.data.push({ priority, value });
        this.data.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.data.shift().value;
    }

    isEmpty() {
        return this.data.length === 0;
    }
}

function dijkstra(graph, start, end) {
    const distances = new Map();
    const previousVertices = new Map();
    const priorityQueue = new PriorityQueue();

    distances.set(start, 0);
    graph.vertices.start();
    while (!graph.vertices.end()) {
        const vertex = graph.vertices.next();
        if (vertex !== start) {
            distances.set(vertex, Infinity);
        }
        previousVertices.set(vertex, null);
    }

    priorityQueue.enqueue(0, start);

    while (!priorityQueue.isEmpty()) {
        const currentVertex = priorityQueue.dequeue();

        if (currentVertex === end) {
            const path = [];
            let step = end;
            while (step) {
                path.push(step);
                step = previousVertices.get(step);
            }
            return path.reverse();
        }

        const adjacents = graph.adjacentsList(currentVertex);
        adjacents.start();
        while (!adjacents.end()) {
            const edge = adjacents.next();
            const neighbor = edge.destinyVertice();
            const newDist = distances.get(currentVertex) + edge.weight();
            if (newDist < distances.get(neighbor)) {
                distances.set(neighbor, newDist);
                previousVertices.set(neighbor, currentVertex);
                priorityQueue.enqueue(newDist, neighbor);
            }
        }
    }

    return null;
}

// Create vertices
let vertexA = new Vertice('A');
let vertexB = new Vertice('B');
let vertexC = new Vertice('C');
let vertexD = new Vertice('D');
let vertexE = new Vertice('E');

// Create graph and add vertices
let graph = new Graph();
graph.addVertice(vertexA);
graph.addVertice(vertexB);
graph.addVertice(vertexC);
graph.addVertice(vertexD);
graph.addVertice(vertexE);

// Connect vertices with weights
graph.connect(vertexA, vertexB, 1); // A -> B (weight 1)
graph.connect(vertexA, vertexC, 4); // A -> C (weight 4)
graph.connect(vertexB, vertexC, 2); // B -> C (weight 2)
graph.connect(vertexB, vertexD, 5); // B -> D (weight 5)
graph.connect(vertexC, vertexD, 1); // C -> D (weight 1)
graph.connect(vertexD, vertexE, 3); // D -> E (weight 3)

// Test Dijkstra's Algorithm
let start = vertexA;
let end = vertexE;
let path = dijkstra(graph, start, end);

if (path) {
    console.log("Shortest path from", start.data(), "to", end.data(), "is:");
    path.forEach(vertex => console.log(vertex.data()));
} else {
    console.log("No path found from", start.data(), "to", end.data());
}

//Breadth-First Search (BFS) for finding the shortest path in an graph
function bfs(graph, start, end) {
    const distances = new Map();
    const previousVertices = new Map();
    const queue = new Queue();

    distances.set(start, 0);
    graph.vertices.start();
    while (!graph.vertices.end()) {
        const vertex = graph.vertices.next();
        if (vertex !== start) {
            distances.set(vertex, Infinity);
        }
        previousVertices.set(vertex, null);
    }

    queue.enqueue(start);

    while (!queue.isEmpty()) {
        const currentVertex = queue.dequeue();

        if (currentVertex === end) {
            const path = [];
            let step = end;
            while (step) {
                path.push(step);
                step = previousVertices.get(step);
            }
            return path.reverse();
        }

        const adjacents = graph.adjacentsList(currentVertex);
        adjacents.start();
        while (!adjacents.end()) {
            const edge = adjacents.next();
            const neighbor = edge.destinyVertice();
            if (distances.get(neighbor) === Infinity) {
                distances.set(neighbor, distances.get(currentVertex) + 1);
                previousVertices.set(neighbor, currentVertex);
                queue.enqueue(neighbor);
            }
        }
    }

    return null;
}

// Create vertices
vertexA = new Vertice('A');
vertexB = new Vertice('B');
vertexC = new Vertice('C');
vertexD = new Vertice('D');
vertexE = new Vertice('E');

// Create graph and add vertices
graph = new Graph();
graph.addVertice(vertexA);
graph.addVertice(vertexB);
graph.addVertice(vertexC);
graph.addVertice(vertexD);
graph.addVertice(vertexE);

// Connect vertices
graph.connect(vertexA, vertexB); // A -> B
graph.connect(vertexA, vertexC); // A -> C
graph.connect(vertexB, vertexD); // B -> D
graph.connect(vertexC, vertexD); // C -> D
graph.connect(vertexD, vertexE); // D -> E

// Test BFS Shortest Path
start = vertexA;
end = vertexE;
path = bfs(graph, start, end);

if (path) {
    console.log("Shortest path from", start.data(), "to", end.data(), "is:");
    path.forEach(vertex => console.log(vertex.data()));
} else {
    console.log("No path found from", start.data(), "to", end.data());
}

// Detects if a linked list has a cycle using Floyd's Cycle Detection Algorithm.
function hasCycle(linkedList) {
    if (linkedList.isEmpty()) return false;

    let slowPointer = linkedList.startNode;
    let fastPointer = linkedList.startNode;

    while (fastPointer !== null && fastPointer.getNext() !== null) {
        slowPointer = slowPointer.getNext();
        fastPointer = fastPointer.getNext().getNext();

        if (slowPointer === fastPointer) {
            return true; // Cycle detected
        }
    }

    return false; // No cycle detected
}

// Creating a linked list
let list = new LinkedList();
let node1 = new Node();
node1.setData(1);
let node2 = new Node();
node2.setData(2);
let node3 = new Node();
node3.setData(3);
let node4 = new Node();
node4.setData(4);

list.addtoEnd(node1);
list.addtoEnd(node2);
list.addtoEnd(node3);
list.addtoEnd(node4);

// Creating a cycle for testing
node4.setNext(node2); // Cycle: node4 -> node2

// Checking if the linked list has a cycle
console.log(hasCycle(list));

// Removing the cycle for testing
node4.setNext(null);

// Checking again if the linked list has a cycle
console.log(hasCycle(list));


// Part 3: Demonstration

/*
An application for a stack can be: checking if a string of parentheses 
is balanced. This is a common problem where stacks are used due to their LIFO (last-in, first-out) nature.
*/
function isBalancedParentheses(str) {
    const stack = new Stack();
    const openBrackets = ['(', '{', '['];
    const closeBrackets = [')', '}', ']'];
    const matchingBrackets = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (let char of str) {
        if (openBrackets.includes(char)) {
            stack.push(char);
        } else if (closeBrackets.includes(char)) {
            if (stack.isEmpty() || stack.pop() !== matchingBrackets[char]) {
                return false;
            }
        }
    }
    
    return stack.isEmpty();
}

const testStrings = ["()", "(]", "({[]})", "({[)]}", "{[()]}"];

testStrings.forEach(str => {
    console.log(`Is "${str}" balanced?`, isBalancedParentheses(str));
});

/*
I can simulate a printer queue. People send print jobs to the printer
and the printer processes them in the order they were received.
*/
const printerQueue = new Queue();

printerQueue.enqueue("Document 1");
printerQueue.enqueue("Document 2");
printerQueue.enqueue("Document 3");

while (!printerQueue.isEmpty()) {
    const currentJob = printerQueue.dequeue();
    console.log(`Printing: ${currentJob}`);
}

/*
In this example I create a binary search tree that allows me to find in log(n) time a selected node
*/
const root = new BinaryTree(14);

const leftChild = new BinaryTree(2);
const rightChild = new BinaryTree(6);
root.setLeftChild(leftChild);
root.setRightChild(rightChild);

leftChild.setLeftChild(new BinaryTree(3));
leftChild.setRightChild(new BinaryTree(1));
rightChild.setLeftChild(new BinaryTree(4));
rightChild.setRightChild(new BinaryTree(7));
/*
                14
		     /      \
		   	2        6
		  /  \      /  \
		 3   1     4    7
*/
console.log("PreOrder Traversal:");
root.preOrder();
console.log("InOrder Traversal:");
root.inOrder();
console.log("PostOrder Traversal:");
root.postOrder();

/*
In this example I created a cities graph and then I printed it in DFS and per level(BFS)
*/
const cities = new Graph();

const v1 = new Vertice("Buenos Aires");
const v2 = new Vertice("Santiago");
const v3 = new Vertice("Lima");
const v4 = new Vertice("Montevideo");
const v5 = new Vertice("Asuncion");
const v6 = new Vertice("Caracas");
const v7 = new Vertice("La Habana");

cities.addVertice(v1);
cities.addVertice(v2);
cities.addVertice(v3);
cities.addVertice(v4);
cities.addVertice(v5);
cities.addVertice(v6);
cities.addVertice(v7);

cities.connect(v1, v2);
cities.connect(v1, v3);
cities.connect(v1, v4);
cities.connect(v1, v5);
cities.connect(v2, v5);
cities.connect(v2, v7);
cities.connect(v3, v5);
cities.connect(v4, v5);
cities.connect(v6, v5);
cities.connect(v6, v7);

let answer = cities.dfs();
console.log("Graph DFS:")
answer.start();
while(!answer.end()) {
	console.log(answer.next().data());
}

answer = cities.bfs();
console.log("Graph BFS:")
answer.start();
while(!answer.end()) {
	console.log(answer.next().data());
}

/*
A linked list is useful for using just the needed memory to store data
*/
const l = new LinkedList();
for (let i = 0; i < 10; i++) {
    l.addtoEnd(i);  
}
console.log("Linked list:")
l.start();
while (!l.end()) {
    console.log(l.next());
}


