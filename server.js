// npm
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const cors = require('cors');
// inner
const config = require('./config');
const router = require('./routes/index-router');

const app = express();

mongoose.connect(config.database,(err)=>{
    if(err){
        console.log(err);
        return;
    }
    
    app.set('secret',config.secret);
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());
    app.use(morgan('dev'));

    app.use(express.static('frontend'));
    app.use('/api',router);
    
    app.listen(config.port,(err,ok)=>{
        if(err)
            console.log('err');
        console.log("Server is listening on port "+config.port);
    });
});

