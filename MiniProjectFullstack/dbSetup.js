var mongoose = require('mongoose');
require("./dbSetup.js");

const dbURI = "mongodb://hallur:12345@ds119969.mlab.com:19969/miniproject";
mongoose.connect(dbURI);
mongoose.connection.on('connected', ()=>{
    console.log('Mongoose default connection open to ' + dbURI);
});
mongoose.connection.on('error', (err)=>{
    console.log('Mongoose default connection error: ' + err) ;
});