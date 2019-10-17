const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const morgan = require('morgan');
const passport  = require('passport');
const flash = require('express-flash');
const session  = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const api = require('../reactRedux/routes/Api');

//Password1
app.set('view-engine', 'ejs');
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api',api)
// app.use(flash())
// app.use(session({
//   secret: 'secretSanta',
//   resave: false,
//   saveUninitialized: false
// }))
// app.use(passport.initialize())
// app.use(passport.session())

/*
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
*/ 

mongoose.connect(
    'mongodb://smart_todoList:Password1@ds229068.mlab.com:29068/heroku_b30fmcz3'
    ,(err)=>{
      if(err){
          console.log("something bad happened")
          console.log(err)
      }else{
          console.log("something good happened")
      }
})

app.listen(3000,()=>{
    console.log("connected")
})

function checkNotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    next()
}