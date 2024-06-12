## JavaScript
> It is a *Just In Time* compiled language. That is done by the engine behind browsers. To run Java on a server you need a tool like NodeJS.

## Table of contents
1. [Basic operations](#basic-operations)
2. [Variables](#variables---there-is-no-need-for-data-type-annotations)
3. [Objects](#objects)
    1. [Prototypal inheritance](#prototypal-inheritance)
    2. [Destructuring](#destructuring)
    3. [Combining](#combine-2-objects)
    4. [Optional chaining](#optional-chaining)
    5. [Truthy and falsy values](#truthy-and-falsey-values)
        1. [Coalescing operator](#coalescing-operator)
    6. [Array tricks](#array-tricks)
4. [Functions](#functions)

### Basic Operations
`console.log('Hi mom');` - **To print**

### Variables - *there is no need for data type annotations*

There are 7 primitive data types built-in:
- string
- number
- bigint
- boolean
- undefined
- symbol
- null
> Anything that is not a primitive, is an object (arrays, functions...)

`let randomNum = 23;` - **It can be reassigned**\
`const name = 'George'` - **Cannot be assigned**\

> If a variable is defined inside a function it becomes a local variable and cannot be used outside the function, unsless it's made into a closure (see below)

### Objects
- Defined using braces `{}`
- They contain key-value pairs that themselves can point to other objects or functions
```JS
const animal = {
    dna: 123,
    legs: {
        front: 2, back: 2
    },
    sleep() {
        console.log('zzz')
    }
};
```
#### Prototypal inheritance
- One object can inherit properties and behaviours of another object through the `prototype chain`
- The end of the prototype chain is `null`
- To check the prototype of an object: `const p1 = Object.getPrototypeOf(animal)`
`console.log(p1)`

```JS
const animal = {
    dna: 123,
};

const dog = {
    bark() {
        console.log('woof');
    }
}

Object.setPrototypeOf(dog, animal) // extend the prototype chain so the animal is a parent of dog
// Now the dog has the dna property even if it's not defined
console.log(dog.dna);
console.log(Object.getPrototypeOf(dog))
```

#### Destructuring
Selecting certain properties of an object

```JS
const dog = {
    name: 'sparky',
    age: 11,
    bark(){
        console.log('woff');
    }
}
```
Multiple options to do so
- Dot notation
```JS
const name = dog.name;
const age = dog.age;
```
- More concises syntax
```JS
const {name, age} = dog;
const {name: fullName , age} = dog;

const arr = ['foo', 'bar', 'baz']; // Random array
const [a, b, c] = arr; // Assign each element a variable
const c = arr[2];
```
#### Combine 2 objects
```JS
const obj1 = {
    first: 'a',
    second: 'b',
    third: 'c',
}

const obj2 = {
    third: 'd',
    fourth: 'e',
}
```
Method one
```JS
const full = Object.assign({},obj1, obj2); 
// Last argument takes the highest priority, so IF there are 2 properties named the same, so here the 'third' property will be 'd'
```
The spread operator
```JS
const full = {...obj1, ...obj2};
// OR merging directly in the syntax
const obj2 = {
    ...obj1,
    third: 'd',
    fourth: 'e',
}
// The position of obj1 it matters, if it's at the end it will get priority
```

#### Optional Chaining
> In case you want to call a property on an object and you're not sure that it's defined
```JS
const obj = undefined;

obj?.hello; // It will return undefined without throwing an error

// It also works for accesing elements form an array OR a function with arguments
const arr = [1, 2, 3];
arr?.[0];

function foo(a,b) { }
foo?.(1,2);
```

#### Truthy and falsey values
- JavaScript IF operations
```JS
if (true) {

} // The code will execute

if (false) {

} // The code will not execute
```
- List of truthy values
![alt text](pics\truthy_and_falsy_JS.png)

##### Coalescing operator
The `??` operator has a more limited set of values so that only `null` and `undefined` are considered falsy
```JS
const x = '';

const val = x ?? 'default';
```

#### Array tricks
```JS
const arr = Array(100).fill(0); // I will create an array with 100 zeroes

// .map is a functions that acts on an array
const arr2 = Array(100).fill(0).map((_, i) => i + 1); // The .map function will act on each element of the array and add 1. So in the end it will be an array ranging from 0 - 99

// To get all the unique elements of an array using the Spread syntax
const arr = [1, 2, 3, 3, 3, 4, 5];
const unique = [..new Set(arr)]; // I will create a new array if it's wrapped in '[]'

// Loop over an array
for(const val of arr) {
    console.log(val);
}

// To get the INDEX and Value of an array
for(const [i, val] of arr.entries()) {
    console.log(i, val);
}

// Array methods
arr.forEach() // perform a loop of an array and provides value and index
arr.map() // convert the values in an array to a different value
arr.filter() // to get rid of unwanted values
arr.find() // find specific values
arr.findIndex() // find specific index
arr.reduce() // take an entire array and calculate a single value from it
```

### Functions
Functions are objects that can be used as variables and passed around to other funtions
A function can be defined at the bottom and can still be used anywhere in the code
```JS
// function declaration
function sayHi(message) {
    return 'Said...' + message;
} 

// function expression. Defined as a variable so it cannot be referenced until it's reached in the code
const sayHi = function(message) {
    return 'Said ...' + message;
} 

// Anonymous function
const annon = arr.map(function(val) {
    return val * 2;
})

// Higher order function
// Are functions that take another function as an argument or return a function
function funWrapper(callback) {
    callback('Called by wrapper');
}

funWrapper(sayHi);
funWrapper(m => console.log(m));

function funCreator() {
    return function(message) {
        return 'Said ...' + message;
    }
}

const fn = creator();
fn('Hello!')
```
- Closures

A function that only depends on it's own arguments and internal data, when it's called it gets pushed to the `Call stack` where it's executed and it's internal memory is only saved until after it's executed and popped off the `Call stack`
```JS
function pureFun(a, b) {
    return a + b;
}
```

Closures are functions that can access values outside their own curly braces
Closures are stored in the `Heap memory`. They are kept indefinetly until the Garbage collector decides to scrap it
```JS
let b = 3;

function impureFun(a) {
    return a + b;
}

// If you have an object inside a function that you want to access outside of that function
// you can create a new function within, thus it will be stored in the 'Heap memory'

function outer() {
    let x = 1
    function inner() {
        x = x + 1
    }
    return inner;
}

const incrementX = outer();
incrementX(); // x = 2
incrementX(); // x = 3
```