/* 
    After initializing npm package via the command: npm init, 
    we will be using ejs, express and mongoose to implement this project (eParchi: A Simple Todo List Generator)
    open terminal and run:
    npm install ejs express mongoose
    Note: Check dependencies in package.json for confirmation if the modules are installed successfully
*/

// The mongoose.js file imports mongoose and creates a connection to the mongoDB database named todoList
const db = require('./config/mongoose');

// A schema for our todo list was defined and compiled in a model. We are importing it here.
const todoList = require('./todoSchema/schema');

// Importing the express module
const express = require('express');
const app = express();

// Localhost server port number
const port = 8000;

// Importing In-built module 'path' 
const path = require('path');

// Setting up EJS engine to render html templates (home.ejs in this case)
app.set('view engine', 'ejs');

// This is why we imported 'path' library above
app.set('views', path.join(__dirname,'views'));  // The join() function will join the current folder path (__dirname) to the folder named 'views'

// When we submit the form from home.html, the data is send via post method request and therefore the form data can be encoded in the url by using the below middleware
app.use(express.urlencoded({ extended: true }));

// This will make the assets folder as the root directory for all the static files such as CSS, JS, etc
app.use(express.static('assets')); // This purpose of this middleware is to route the static files from the assets directory


let todoListData; // After fetching all the todoLists from MongoDB, we store them in this variable
app.get('/', async(req, res) => {  
    // the find({}) will fetch all the documents inside our collection from todoList DB and store it in the defined variable
    const todoListData = await todoList.find({});   // await keyword is used in case of async function
    //console.log(todoListData);

    // Now we can route to the home page
    return res.render('home', {
      page_title: 'eParchi',
      todo_list_data: todoListData  // todoListData now becomes accessible to home.ejs via the local var todo_list_data
    });

})

// Delete Todo
app.get('/deleteTodo', (req, res) => {
  let id = req.query.id;
  todoList.findByIdAndDelete(id)
   .then(docs => {
       console.log("Deleted: ", docs);
       res.redirect('back');
   })
   .catch(err => {
       console.log(err);
       res.status(500).send("Error occurred");
   });
});

// This block will be executed when user submits the form (<form action='/todo' method='post'>)
app.post(
'/todo', 
function (req, res) 
{
  console.log(req.body);
  // Creating a new document in todoList DB
  todoList.create   
  (
    {
      title: req.body.todoListName,
      category: req.body.category,
      dueDate: req.body.dueDate,
      tasks: req.body.task
    }
  );
  // Redirect to the home page
  return res.redirect('back');
});

// Running the server at defined port
app.listen(port, function() {
  console.log('Local server running at http://127.0.0.1:', port);
})