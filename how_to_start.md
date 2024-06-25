
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
