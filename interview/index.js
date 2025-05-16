
const numbers = [7,5,3,7,7,3]
let k

function totals(nums) {
    const map = {}
    for (let i = 0; i < nums.length; i++){
        if (nums[i] in map) {
            map[nums[i]] += 1
        } else {
            map[nums[i]] = 1
        }
    }

    console.log('map', map)
    return map
}

function max() {
    const map = totals(numbers)

    const maxValue = Math.max(...Object.values(map))
    const maxKey = Object.keys(map).find(key => map[key] === maxValue)
    console.log("values", maxValue)
    console.log("key", maxKey)
    k = maxKey
    return k
}

max()


// const Stack = function() {
//     // how many items are in the stack
//     this.count = 0;
//     this.storage = {};

//     // add a value onto the end of the stack
//     this.push = function(value) {
//         this.storage[this.count] = value;
//         this.count++;
//     }

//     // Removes and returns the value at the end of the stack
//     this.pop = function() {
//         if (this.count === 0) {
//             return undefined;
//         }
//         // if we are poping off, then we have to decrement the count
//         this.count--;
//         const result = this.storage[this.count]
//         delete this.storage[this.count];
//         return result;
//     }

//     this.size = function() {
//         return this.count;
//     }

//     // Returns the value at the end of the stack
//     this.peek = function() {
//         return this.storage[this.count-1];
//     }

//     console.log(this)
// }

// const myStack = new Stack();

// myStack.push(1)
// myStack.push(2)
// console.log(myStack.peek())
// console.log(myStack.pop())
// console.log(myStack.peek())

// What is a closure
// A closure gives a you access to outer functions scope from an inner function
// higher order functions - functions that accept a function as a parameter, or returns a function. ex .map
// Arrow functions can not be Constructors, not hoisted
// What is a Pure Function?
// What is Function Composition?
// What is Functional Programming
// What is a Promise.  Build one from scratch new Promise
// What is asynchronus Programming
// What is typsescript
// Event loop

// What is a React hook
// useEffect infinite loop
// How do you create a click counter in react?

// const stack = [];
// const word = "racecar";
// let reverseWord = "";

// // put letters of a word into a stack
// for (let i = 0; i < word.length; i++) {
//     stack.push(word[i]);
// }
// console.log("stack", stack)

// // pop off the stack in reverse order
// for (let i = 0; i < word.length; i++) {
//     reverseWord += stack.pop()
// }

// if (reverseWord === word) {
//     console.log(`${word} is a palindrome`)
// } else {
//     console.log(`${word} is not a palindrome`)
// }

/*
Stack Q&A
LIFO Structures
Q: Can you explain what a stack is and how it operates?

A: A stack is a linear data structure that follows the Last In, First Out (LIFO) principle. 
This means that the last element added to the stack is the first one to be removed. 
You can think of it like a stack of plates: you add new plates to the top and also remove plates from the top. 
The main operations associated with a stack are: 
    1. **Push**: Adding an element to the top of the stack. 
    2. **Pop**: Removing the element from the top of the stack. 
    3. **Peek (or Top)**: Viewing the element at the top of the stack without removing it. 
    4. **IsEmpty**: Checking if the stack is empty.
*/

/*
Q: What are some common use cases for stacks in programming?
A: No problem! Stacks are used in various scenarios in programming. 
Here are a few common use cases: 
    1. **Function Call Management**: Stacks are used to manage function calls in programming languages. When a function is called, its context (like local variables and return address) is pushed onto the call stack. When the function returns, that context is popped off the stack. 
    2. **Expression Evaluation**: Stacks are used in evaluating expressions, especially in converting infix expressions (like `A + B`) to postfix (like `AB+`) or prefix notation. 
    3. **Backtracking Algorithms**: Stacks are useful in algorithms that require backtracking, such as solving mazes or puzzles (like the N-Queens problem). 
    4. **Undo Mechanisms**: Many applications (like text editors) use stacks to implement undo functionality. Each action is pushed onto a stack, and when the user wants to undo an action, the last action is popped off. 
    5. **Syntax Parsing**: Compilers use stacks to parse syntax in programming languages, ensuring that parentheses and other structures are properly matched.
*/

/*
Q: Can you describe the time complexity of the main operations (push, pop, and peek) in a stack?
A: The time complexity for the main operations of a stack is quite straightforward: 
    1. **Push**: O(1) - Adding an element to the top of the stack takes constant time, regardless of the number of elements in the stack. 
    2. **Pop**: O(1) - Removing the top element from the stack also takes constant time. 
    3. **Peek (or Top)**: O(1) - Viewing the top element without removing it takes constant time as well. In summary, all three main operations (push, pop, and peek) have a time complexity of O(1), which makes stacks very efficient for these operations. 
*/

/*
Q: What is the difference between a stack and a queue?
A: The main difference between a stack and a queue lies in how they handle the order of elements: 1. **Stack**: - Follows the Last In, First Out (LIFO) principle. - The last element added to the stack is the first one to be removed. - Think of it like a stack of plates: you add and remove plates from the top. 2. **Queue**: - Follows the First In, First Out (FIFO) principle. - The first element added to the queue is the first one to be removed. - Think of it like a line of people waiting: the first person in line is the first to be served. In summary, stacks are LIFO, while queues are FIFO. 
*/

/*
Q: Can you implement a stack using an array? What would the basic operations look like?
A: Here's a simple implementation of a stack using an array in a programming language like Python. The basic operations (push, pop, and peek) can be defined as follows: ```python class Stack: def __init__(self): self.stack = [] # Initialize an empty list to represent the stack def push(self, item): self.stack.append(item) # Add the item to the top of the stack def pop(self): if not self.is_empty(): return self.stack.pop() # Remove and return the top item else: raise IndexError("Pop from an empty stack") # Handle underflow def peek(self): if not self.is_empty(): return self.stack[-1] # Return the top item without removing it else: raise IndexError("Peek from an empty stack") # Handle empty stack def is_empty(self): return len(self.stack) == 0 # Check if the stack is empty def size(self): return len(self.stack) # Return the number of items in the stack ``` 
In this implementation: 
    - The `push` method adds an item to the end of the list (top of the stack). 
    - The `pop` method removes the last item from the list (top of the stack) and returns it. 
    - The `peek` method returns the last item without removing it. 
    - The `is_empty` method checks if the stack has any items. 
*/

/*
Q: What are the potential drawbacks of using a stack implemented with a fixed-size array?
A: Here are some potential drawbacks of using a stack implemented with a fixed-size array: 
    1. **Fixed Capacity**: A stack implemented with a fixed-size array has a predetermined capacity. If the number of elements exceeds this capacity, it can lead to a stack overflow, where you cannot push any more elements onto the stack. 
    2. **Wasted Space**: If the stack is not fully utilized, there may be wasted space in the array. For example, if you allocate an array of size 100 but only use 10 elements, the remaining 90 slots are unused. 
    3. **Inflexibility**: Once the size of the array is set, it cannot be changed. If you need a larger stack, you would have to create a new array and copy the existing elements over, which can be inefficient. 
    4. **Performance Issues**: If resizing is required (in the case of dynamic arrays), it can lead to performance issues due to the overhead of copying elements to a new array. To address these issues, many implementations use dynamic arrays or linked lists, which can grow and shrink as needed. 
*/

/*
Q: Can you explain how recursion can be related to stacks?
A: Recursion and stacks are closely related due to how function calls are managed in programming.
When a function calls itself (recursion), each call creates a new context that needs to be remembered until the function completes. This context includes local variables, the return address, and other information. Here's how stacks come into play: 
    1. **Call Stack**: When a function is called, its context is pushed onto the call stack. This allows the program to remember where to return after the function completes. Each recursive call adds a new layer to the stack.
    2. **Unwinding the Stack**: When a base case is reached and the function starts returning, the contexts are popped off the stack in reverse order. This unwinding continues until all recursive calls have been resolved. 
    3. **Stack Overflow**: If a recursive function does not have a proper base case or if it recurses too deeply, it can lead to a stack overflow. This happens when the call stack exceeds its maximum size, resulting in an error. In summary, recursion relies on the call stack to manage function calls and their contexts, making stacks an essential part of how recursive functions operate.. 
*/

/*
Q: Can you describe a scenario where using a stack would be more beneficial than using other data structures?
A: That's perfectly fine! Here’s a scenario where using a stack would be particularly beneficial: 
    **Scenario: Expression Evaluation and Syntax Checking** When evaluating mathematical expressions or checking for balanced parentheses in programming languages, a stack is often the most suitable data structure to use. 
    ### Example: Checking for Balanced Parentheses Consider the expression: `((a + b) * (c - d))`. To check if the parentheses are balanced, you can use a stack: 
    1. **Process Each Character**: As you iterate through the expression: 
    - If you encounter an opening parenthesis `(`, you push it onto the stack. 
    - If you encounter a closing parenthesis `)`, you check if the stack is empty: 
    - If it is empty, it means there is no matching opening parenthesis, and the expression is unbalanced. 
    - If it is not empty, you pop the top of the stack (which should be the matching opening parenthesis). 
    2. **Final Check**: After processing all characters, if the stack is empty, it means all opening parentheses had matching closing ones, and the expression is balanced. If the stack is not empty, it indicates there are unmatched opening parentheses. 
    ### Why Use a Stack? 
    - **LIFO Nature**: The stack's Last In, First Out (LIFO) nature perfectly matches the requirement of matching parentheses, where the most recent opening parenthesis must be closed first. 
    - **Simplicity**: The stack provides a simple and efficient way to manage the state of the parentheses as you process the expression. In contrast, using other data structures like arrays or lists would complicate the logic and make it less efficient for this specific task.
*/


