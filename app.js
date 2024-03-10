// Basic Lib import
const express = require('express');
const router = require('./src/route/api');
const app = new express();
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
const cors = require('cors');
const mongoose = require('mongoose');

// Cors Origin Implementation
app.use(cors());

// Security  Pipeline implementation
app.use(helmet());
app.use(hpp());
app.use(express.json({limit:'20mb'}));
app.use(express.urlencoded({extended: true}));
let limiter = rateLimit({windowMs: 15*60*1000, max: 3000});
app.use(limiter);


// Database Connection
const URL = 'mongodb+srv://siddique:siddique1234@cluster0.rpnurvs.mongodb.net/ToDoMern5';
let OPTION = {user:'siddique', pass:'siddique1234', autoIndex: true}
mongoose.connect(URL, OPTION).then((res)=>{
    console.log('Database Connected');
}).catch((err)=>{
    console.log(err);
})

// Route Implement
app.use('/api', router);

// 404 Not Found Implementation

app.use('*', (req,res) => {
    res.status(404).json({data: "Not found"});
});

module.exports = app;






