
const mongoose=require('mongoose');

//setting some rules for contactlist object in index.js through
//Schema
const contact_schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
})
const Contact=mongoose.model('Contact',contact_schema);

//exporting Contact varible to outside availblity
module.exports=Contact;
