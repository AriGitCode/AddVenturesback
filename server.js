'use strict'


 //Library imports
const express = require('express');
const mongoose = require ('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const bodyParser = require ('body-parser');
const cors = require('cors'); 
const PORT = 8081



//Import Routers
const usersRouter = require('./routers/usersRouter.js');
const placesRouter = require('./routers/placesRouter.js');
const { DATABASE_URL } = require('./config');


const app = express()


// Apply middleware
app.use(morgan('dev')); //log the http layer
app.use(bodyParser.json({ limit: "200mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "200mb", extended: false }));
app.use(cors());

//---Main Routes----
app.use('/users', usersRouter);
app.use('/places', placesRouter);



//DB
mongoose.connect(DATABASE_URL)
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () =>{
    console.log('\x1b[42m%s\x1b[0m',`App is running on port ${PORT}`);
})
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});


