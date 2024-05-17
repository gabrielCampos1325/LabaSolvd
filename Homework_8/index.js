// Part 1: Class Design
/* This class models a Book object;
This class have 5 attributes:
    - title: name of the book (string)
    - author: author of the book (string)
    - isbn: a unique identifier (string)
    - price: price of the book (real)
    - avalilability: current disponibility of the book (boolean)
*/
class Book {
    constructor(title, author, ISBN, price, availability) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this.price = price;
        this.availability = availability;
    }
}

/* This class models a FictionBook object;
This class inherits from Book and have 6 attributes:
    The first 5 are the same for Book class and the last 
    one is specific for the FictionBook class:
    - year: year of publish (number)
*/
class FictionBook extends Book {    
    constructor(title, author, ISBN, price, availability, year) {
        super(title, author, ISBN, price, availability);
        this.year = year;
    }
}

/* This class models a FictionBook object;
This class inherits from Book and have 6 attributes:
    The first 5 are the same for Book class and the last 
    one is specific for the NonFictionBook class:
    - category: category of the book (string)
*/
class NonFictionBook extends Book {
    constructor(title, author, ISBN, price, availability, category) {
        super(title, author, ISBN, price, availability);
        this.category = category;
    }
}

/* This class models a User object;
This class have 4 attributes:
    - name: name of the person (string)
    - email: email of the person (string)
    - userId: unique ID of the person (string)
    - cart: initialized in the constructor
This class have 3 methods:
    -addBook: it sends a message to the cart so it can add a book
    -removeBook: it sends a message to the cart so it can remove a book
    -getCart: getter for the cart
*/
class User {
    constructor(name, email, userId) {
        this.name = name;
        this.email = email;
        this.userId = userId;
        this.cart = new Cart();
    }

    addBook(book) {        
        this.cart.addBook(book);               
    }

    removeBook(book) {
        this.cart.removeBook(book); 
    }

    getCart() {
        return this.cart;
    }
}

/* This class models a Cart object;
This class have 1 attribute:
    - books: an array that contains books
This class have 4 methods:
    -addBook: if the availability of the book is true it adds the book to the attribute cart
    -removeBook: if the the book is in the cart it gets deleted
    -getTotalPrice: it accumulates the total price of the books in the array
    -getBooks: getter for the books array
*/
class Cart {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        if (book.availability) {
            this.books.push(book);  
        } else {
            console.log("There is no availability for that book");
        }               
    }

    removeBook(book) {
        const index = this.books.findIndex(b => b === book);
        if (index !== -1) {
            this.books.splice(index, 1);
        } else {
            console.log("There book is not in the cart")
        }
    }

    getTotalPrice() {
        return this.books.reduce((total, book) => total + book.price, 0);
    }

    getBooks() {
        return this.books;
    }
}

/* This class models a Order object;
This class have 2 attributes:
    - books: an array that contains books
    - totalPrice: total price of the books contained in the array
This class have 1 method:
    -show: it prints the name of every book in the books attribute
*/
class Order {
    constructor(cart) {    
        this.books = cart.getBooks();
        this.totalPrice = cart.getTotalPrice();    
    }

    show() {
        this.books.forEach(element => {
            console.log(element.title)
        });
    }
}


//Part 2: Implementation
//creating books
const book1 = new Book("title1", "author1", "111111111", 19, true);
const book2 = new Book("title2", "author2", "222222222", 29, false);
const book3 = new Book("title3", "author3", "333333333", 39, true);
const book4 = new Book("title4", "author4", "444444444", 49, false);
const book5 = new Book("title5", "author5", "555555555", 59, true);
const book6 = new Book("title6", "author6", "666666666", 69, false);
const book7 = new Book("title7", "author7", "777777777", 79, true);
const book8 = new Book("title8", "author8", "888888888", 89, false);
const book9 = new Book("title9", "author9", "999999999", 99, true);
const book10 = new Book("title10", "author10", "101010101", 109, false);

//creating users
const user1 = new User("Gabriel", "gabriel@example.com", 1);
const user2 = new User("Lautaro", "lautaro@example.com", 2);
const user3 = new User("Martin", "martin@example.com", 3);

//adding books to the user's cart
user1.addBook(book1);
user1.addBook(book2);
user1.addBook(book3);

user2.addBook(book4);
user2.addBook(book5);
user2.addBook(book6);

user3.addBook(book7);
user3.addBook(book8);
user3.addBook(book9);


//Part 3: Demonstration
//Represents a collection of books
const library = [book1, book2, book3, book4, book5, 
    book6, book7, book8, book9, book10];

//This function checks if a book exists in a colection of books
function browseBook(library, tittle) {
    const index = library.findIndex(b => b.title === tittle);
    if (index === -1) {
        console.log("The book searched does not exist in the library");
    } else {
        if (library[index].availability) {
            console.log("The book searched is available"); 
        } else {
            console.log("The book searched is currently not available");
        }  
    }   
}

browseBook(library, "title10");
browseBook(library, "title1");
browseBook(library, "title11");

user1.addBook(book1);
user1.addBook(book3);
user1.addBook(book5);

user2.addBook(book7);
user2.addBook(book9);

//creating subclasses of books
const fictionBook = new FictionBook("fiction1", "author1", "111111111", 19, true, 2020);
const noFictionBook = new NonFictionBook("nofiction1", "author1", "1111111111", 18, true, "Drama");

//adding subclasses of books to the user's cart
user1.addBook(fictionBook);
user2.addBook(noFictionBook);

//creating an order from user's cart and then showing it
const order1 = new Order(user1.getCart());
order1.show();
const order2 = new Order(user2.getCart());
order2.show();