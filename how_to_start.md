
1. Start Xampp
sudo /opt/lampp/manager-linux-x64.run
2. npm run dev






1.install npm package
2. create server with express
3. create connection with mysql

4. create model
Models can be defined in two equivalent ways in Sequelize:

Calling sequelize.define(modelName, attributes, options)
Extending Model and calling init(attributes, options)
After a model is defined, it is available within sequelize.models by its model name.

- model name must be singular i.e.(user, employee, product)

/*
User.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)

User.sync({ force: true }) - This creates the table, dropping it first if it already existed

User.sync({ alter: true }) - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
*/

## what are the security measure have to take when work with ejs in nodejs.

When working with EJS (Embedded JavaScript) in Node.js, it’s crucial to follow security best practices to protect your application from common vulnerabilities such as Cross-Site Scripting (XSS) and template injection. Here are some key security measures:

### 1. Output Escaping
- **Automatic Escaping:** EJS automatically escapes HTML by default. Ensure you are using `<%= %>` for outputting variables, which escapes the content, rather than `<%- %>` which does not escape the content.
  ```ejs
  <%= userInput %>  <!-- Escaped output -->
  <%- userInput %>  <!-- Unescaped output, use with caution -->
  ```

### 2. Avoid Executing Untrusted Code
- **Do not use user input directly in EJS:** Never pass user input directly to EJS templates without sanitizing or validating it.
- **Avoid `eval`-like constructs:** Avoid using JavaScript's `eval` or similar methods to execute dynamic code, as this can lead to security issues.

### 3. Content Security Policy (CSP)
- **Implement CSP:** Use HTTP headers to define a Content Security Policy, which helps to prevent XSS attacks by restricting sources of content.
  ```http
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'
  ```

### 4. Secure Dependencies
- **Keep dependencies updated:** Regularly update EJS and other dependencies to ensure you are protected from known vulnerabilities.
- **Use security tools:** Utilize tools like `npm audit` to scan for vulnerabilities in your dependencies.

### 5. Input Validation and Sanitization
- **Validate inputs:** Ensure all user inputs are validated on the server-side to meet expected formats.
- **Sanitize inputs:** Use libraries like `validator` or `DOMPurify` to sanitize user inputs, especially when these inputs might be used in EJS templates.

### 6. Secure Configuration
- **Disable EJS evaluation:** If you do not need to evaluate JavaScript code in your EJS templates, disable this functionality.
  ```js
  app.engine('ejs', require('ejs').__express);
  app.set('view engine', 'ejs');
  app.set('view options', { delimiter: '%' });
  ```

### 7. Use Helmet
- **Helmet Middleware:** Use Helmet to set various HTTP headers for security, such as preventing clickjacking, setting CSP, and other security headers.
  ```js
  const helmet = require('helmet');
  app.use(helmet());
  ```

### 8. Template Injection Protection
- **Sanitize data:** Ensure any data being passed into your templates is sanitized.
- **Avoid direct execution:** Avoid directly executing user-supplied data as EJS templates or code.

### 9. Proper Error Handling
- **Do not expose stack traces:** Ensure that stack traces and detailed error messages are not exposed to end-users. Use generic error messages instead.
  ```js
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  ```

### 10. Server-Side Logic Separation
- **Keep logic separate:** Separate your business logic from your presentation layer to avoid accidentally exposing server-side logic through EJS.

By following these best practices, you can significantly enhance the security of your Node.js application when using EJS templates.

https://anywhere.epam.com/en/blog/node-js-security-best-practices







# BEST - EVENT LOOP IN NODEJS

https://www.geeksforgeeks.org/node-js-event-loop/
—---------------------------------—---------------------------------—---------------------------------

The event loop is a fundamental concept in JavaScript that enables asynchronous programming and non-blocking I/O operations. Here’s a breakdown of how it works:

1. **Call Stack**: This is where function execution contexts are stored. JavaScript is single-threaded, meaning it can execute one task at a time. Functions are pushed onto the call stack when they are invoked and popped off when they return.

2. **Web APIs**: These are browser-provided features such as `setTimeout`, `DOM events`, `fetch`, etc., that handle tasks asynchronously. When an asynchronous operation completes, it doesn’t go back to the call stack directly but instead goes to the task queue or microtask queue.

3. **Task Queue**: This is where callback functions from asynchronous operations (like `setTimeout`, `setInterval`, or events like `click`) are placed once they complete.

4. **Microtask Queue**: This queue handles promises and other microtasks, which are supposed to be executed before any other tasks.

5. **Event Loop**: The event loop continuously monitors the call stack and the task queue. If the call stack is empty, it looks at the task queue. If there are tasks in the task queue, it pushes the first task from the queue onto the call stack for execution. The event loop also prioritizes the microtask queue, executing all microtasks before moving on to the task queue.

### Steps of the Event Loop:

1. **Check Call Stack**: If the call stack is not empty, continue processing the current function until the call stack is empty.

2. **Execute Microtasks**: If the call stack is empty, the event loop will execute all available microtasks before proceeding to the task queue.

3. **Handle Task Queue**: Once the microtask queue is empty, the event loop will move tasks from the task queue to the call stack for execution.

### Example:

```javascript
console.log('Start');

setTimeout(() => {
  console.log('Timeout callback');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise callback');
});

console.log('End');
```

#### Output:
```
Start
End
Promise callback
Timeout callback
```

### Explanation:
1. `console.log('Start')` is executed and logged immediately.
2. `setTimeout` is called, and its callback is placed in the task queue.
3. `Promise.resolve().then` is called, and its callback is placed in the microtask queue.
4. `console.log('End')` is executed and logged immediately.
5. The call stack is now empty. The event loop looks at the microtask queue, finds the promise callback, and executes it.
6. The promise callback (`console.log('Promise callback')`) is executed and logged.
7. The event loop then moves to the task queue and executes the timeout callback (`console.log('Timeout callback')`).

This mechanism ensures that JavaScript can handle asynchronous operations efficiently without blocking the main thread, providing a smooth and responsive user experience.


# In the event loop which executes first setTimeout() or promise().

In JavaScript's event loop, the order of execution between `setTimeout()` and `Promise` callbacks depends on their respective task queues. Here's a detailed breakdown:

1. **Microtasks Queue (Promises)**:
   - Microtasks include tasks like `Promise` callbacks and `MutationObserver` callbacks.
   - These tasks are executed after the currently executing script and before the event loop checks for the next macrotask.
   - This means all the microtasks that are queued will run before any rendering or other macrotasks.

2. **Macrotasks Queue (setTimeout)**:
   - Macrotasks include tasks like `setTimeout()`, `setInterval()`, `setImmediate()`, I/O operations, and UI rendering.
   - After the current macrotask completes, the event loop will process all available microtasks before moving to the next macrotask.

Given this behavior, `Promise` callbacks (microtasks) will always execute before `setTimeout()` callbacks (macrotasks), even if the `setTimeout()` is set with a delay of 0 milliseconds.

### Example

```javascript
console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise');
});

console.log('End');
```

**Expected Output**:
```
Start
End
Promise
Timeout
```

### Explanation

1. **Synchronous code**:
   - `console.log('Start')` executes first.
   - `console.log('End')` executes next.

2. **Microtasks (Promises)**:
   - `Promise.resolve().then()` queues a microtask.
   - The microtask (Promise callback) logs `Promise`.

3. **Macrotasks (setTimeout)**:
   - `setTimeout(() => { console.log('Timeout'); }, 0)` queues a macrotask.
   - The macrotask logs `Timeout`.

In summary, in the event loop, `Promise` callbacks (microtasks) execute before `setTimeout()` callbacks (macrotasks).


# how many core in my macbook 1.8 GHz Dual-Core Intel Core i5

Your MacBook with a 1.8 GHz Dual-Core Intel Core i5 processor has 2 physical cores. Here are a few additional details about this processor:

- **Physical Cores**: 2
- **Logical Cores (Threads)**: 4 (each physical core supports Hyper-Threading, allowing it to handle two threads simultaneously)
- **Base Frequency**: 1.8 GHz
- **Turbo Boost Frequency**: Up to 2.9 GHz (this is the maximum clock speed the processor can reach under load)

To summarize, your MacBook's 1.8 GHz Dual-Core Intel Core i5 processor has 2 physical cores and can handle 4 simultaneous threads due to Hyper-Threading.


==================================================================

The event loop in Node.js is a mechanism that allows Node.js to perform non-blocking I/O operations, even though JavaScript is single-threaded. It handles the execution of multiple operations in a way that makes it seem as though they are happening simultaneously, without creating multiple threads. Here’s a simple breakdown:

1. **Single-Threaded Nature**: Node.js runs on a single thread, meaning it can only do one thing at a time. However, it needs to handle many tasks, like reading files, querying databases, and making network requests.

2. **Asynchronous Callbacks**: To handle multiple tasks efficiently, Node.js uses asynchronous callbacks. When an operation (like reading a file) is started, Node.js can continue executing other code while waiting for the operation to complete. When the operation finishes, it "calls back" with the result.

3. **Event Loop Mechanism**:
   - **Execution of Code**: When you run a Node.js application, it first executes the initial code (like setting up servers, defining functions, etc.).
   - **Handling Events and Callbacks**: After the initial code execution, Node.js enters the event loop. The event loop continuously checks for pending tasks (callbacks, I/O operations, timers, etc.) and executes them.
   - **Processing Tasks**: When a task completes (like a file read), its callback is placed in a queue. The event loop processes these callbacks one by one, ensuring they are executed when their corresponding operations are complete.

4. **Phases of the Event Loop**: The event loop operates in phases, each handling different types of tasks:
   - **Timers**: Executes callbacks of `setTimeout` and `setInterval`.
   - **Pending Callbacks**: Executes I/O callbacks deferred from the previous cycle.
   - **Idle, Prepare**: Used internally by Node.js.
   - **Poll**: Retrieves new I/O events and executes I/O-related callbacks.
   - **Check**: Executes `setImmediate` callbacks.
   - **Close Callbacks**: Executes close events, like `socket.on('close')`.

### Example

Here's a simple example to illustrate:

```javascript
console.log('Start');

setTimeout(() => {
  console.log('Timeout callback');
}, 1000);

console.log('End');
```

- When this script runs:
  - "Start" is printed.
  - The `setTimeout` function is called, and its callback is registered to be executed after 1 second.
  - "End" is printed.
  - After 1 second, the event loop picks up the `setTimeout` callback and executes it, printing "Timeout callback".

### Summary

- **Single-threaded**: Node.js can do one thing at a time, but...
- **Asynchronous and Non-blocking**: It uses callbacks to handle multiple tasks without waiting for each to complete before starting the next.
- **Event Loop**: Manages and executes these callbacks, allowing Node.js to perform efficiently and handle many tasks seemingly at the same time.









DELIMITER //

CREATE PROCEDURE FetchAllUsers()
BEGIN
    SELECT * FROM users;
END //

DELIMITER ;




DELIMITER //

CREATE PROCEDURE GetUserById(IN userId INT)
BEGIN
    SELECT * FROM users WHERE id = userId;
END //

DELIMITER ;


DELIMITER //

CREATE TRIGGER after_user_update
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
    INSERT INTO audit_logs (user_id, old_first_name, old_last_name, new_first_name, new_last_name)
    VALUES (OLD.id, OLD.first_name, OLD.last_name, NEW.first_name, NEW.last_name);
END //

DELIMITER ;
--------------
Trigger
views
stored procedure + sql ORM
