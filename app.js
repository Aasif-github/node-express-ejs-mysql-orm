const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const PORT = 3000;
const ejs = require('ejs');
const path = require('path');

// controller
const userCtr = require('./controllers/userController');
const myEmitter = require('./controllers/emitter.js');
 

 

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the directory where the template files are located
app.set('views', path.join(__dirname, 'views'));

app.get('/about', (req, res) => {
    res.render('about', { title: 'About', content: 'This is the about page.' });
});
  

// Register event listeners
myEmitter.on('userProfileSeen', (name) => {
    console.log(`user profile seen, ${name}!`);
});


app.use(bodyParser.json());

// Routes
app.get('/', function(req, res){
    res.send('hello world');
})

app.get('/users', userCtr.getUsers);
app.get('/user/:id', userCtr.getUser);
app.post('/users', userCtr.addUser);
app.patch('/user/:id', userCtr.updateUser);
app.delete('/user/:id', userCtr.deleteUser);

//
app.get('/users/details', userCtr.getFullDetails);

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})