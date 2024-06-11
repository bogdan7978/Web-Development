## JavaScript
#### It is a *Just In Time* compiled language. That is done by the engine behind browsers. To run Java on a server you need a tool like NodeJS.

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

> If a variable is defined inside a function it becomes a local variable and cannot be used outside the function

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