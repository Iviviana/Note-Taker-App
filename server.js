// Importing required information
const express=require('express');
const routes=require('./routes/routes');
const apiRoutes=require("./routes/apiRoutes");

//The port used by our system
const PORT=3001;
//const PORT=process.env.PORT for heroku

//Initializing app variable by setting it to the value of express
const app=express();

//Sets up the express app to handle data parsing
app.use(express.urlencoded({extended: true}));

//set up json across express so it can be used
app.use(express.json());

//So that it knows what is not dynamically changing hence `static`; To add, when first starting even without the export, the front page loaded because this folder contains an `INDEX`, however, nothing else worked because that is what we're working on 
app.use(express.static('public'));
app.use("/api", apiRoutes);
app.use("/", routes);

//Setting up the listener
app.listen(PORT,()=>{
    console.log(`App listening at http://localhost:${PORT}`);
});



