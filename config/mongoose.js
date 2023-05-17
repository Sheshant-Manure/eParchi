// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
 //   await mongoose.connect('mongodb://127.0.0.1:27017/todoList');
 await mongoose.connect('mongodb+srv://msheshant1997:Sheshant123@cluster0.vhl81py.mongodb.net/?retryWrites=true&w=majority');
}