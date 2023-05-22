//require for mongoose
const mongoose=require('mongoose');

//connect to mongodb using mongoose
mongoose.connect('mongodb://localhost/contact_list_db');

//acquire the connection
const db=mongoose.connection;

//if error
db.on('error',console.error.bind(console,'error is connecting to db'));

//if connected
db.once('open',()=>{console.log("successfullly connected to mongodb")});