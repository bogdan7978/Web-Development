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