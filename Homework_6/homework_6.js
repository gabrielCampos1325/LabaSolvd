//Task 1: Quasi-Tagged Templates
function localize(strings, ...props) {    
    for (let index = 0; index < props.length; index++) {
        return translations[language][props[index]];
    }
}

const translations = {
	en: {
        greet: "Hello",
        intro: "Welcome to our website"
    },
	fr: {
		greet: "Bonjour",
		intro: "Bienvenue sur notre site web"
	}
};

const language = "fr"; // Change to "en" for English
const greeting = "greet";
const introduction = "intro";

const localizedGreeting = localize`${greeting}`;
const localizedIntroduction = localize`${introduction}`;

console.log(localizedGreeting); // Expected: "Bonjour" (for language "fr")
console.log(localizedIntroduction); // Expected: "Bienvenue sur notre site web" (for language "fr")


//Task 2: Advanced Tagged Template
function highlightKeywords(template, keywords){
    for (let index = 0; index < keywords.length; index++) { 
        template = template.replace(/\${(\d+)}/, `<span class= highlight'>${keywords[index] || ''}</span>`);        
    }
    return template;
}

const keywords = ["JavaScript", "template", "tagged"];
const template = "Learn \${0} tagged templates to create custom \${1} literals for \${2} manipulation.";

const highlighted = highlightKeywords(template, keywords);

console.log(highlighted);
/* Expected: "Learn <span class='highlight'>JavaScript</span> tagged templates to create custom 
<span class='highlight'>template</span> literals for <span class='highlight'>tagged</span> manipulation." */


//Task 3: Multiline Tagged Template
function multiline(str, ...args) {
    const arrOfLines = str[0].trim().split("\n");
    let result = "";
    for (let i = 0; i < arrOfLines.length; i++) {
        result += `${i+1} ${arrOfLines[i]}\n`;  
    }
    return result.trim();
}

const code = multiline`
function add(a, b) {
return a + b;
}
`;

console.log(code);
/* Expected:
"1 function add(a, b) {
 2 return a + b;
 3 }" */


//Task 4: Implementing Debounce Function
/* function debounce(func, delay) {
    let timeOut;
    return function(...args) {
        clearTimeout(timeOut);
        timeOut = setTimeout(() => func(...args), delay);
    };
}

function debouncedSearch(query) {
	// Perform search operation with the query
	console.log("Searching for:", query);
}

const debouncedSearchHandler = debounce(debouncedSearch, 3000);

const inputElement = document.getElementById("search-input");
inputElement.addEventListener("input", event => {
	debouncedSearchHandler(event.target.value);
}); */

//Task 5: Implementing Throttle Function
function throttle(func, interval) {
    let funcTime = Date.now();
    return function(...args) {
      if (Date.now() - funcTime >= interval) {
        func(...args);
        funcTime = Date.now()
      }
    };
};

function onScroll(event) {
	// Handle scroll event
	console.log("Scroll event:", event);
}

const throttledScrollHandler = throttle(onScroll, 1000);

setInterval(() => {
    throttledScrollHandler({ type: 'scroll' });
}, 1000);
//window.addEventListener("scroll", throttledScrollHandler);

//Task 6: Currying Function Implementation
function curry(funct, arity) {
    return function curried(...args) {
        if (args.length >= arity) {
            return funct(...args)
        } else {
            return function(...moreArgs) {
                return curried(...args, ...moreArgs);
            }
        }
    }
}

function multiply(a, b, c) {
	return a * b * c;
}

const curriedMultiply = curry(multiply, 3);

const step1 = curriedMultiply(2); // Returns a curried function
const step2 = step1(3); // Returns a curried function
const result = step2(4); // Returns the final result: 2 * 3 * 4 = 24

console.log("Result:", result); // Expected: 24