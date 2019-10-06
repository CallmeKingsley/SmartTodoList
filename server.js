const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const morgan = require('morgan');
const passport  = require('passport');
const flash = require('express-flash');
const session  = require('express-session');
const mongoose = require('mongoose');
const Product  = require('../reactRedux/models/index')
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

app.get('/', (req, res) => {
    res.render('index.ejs',{name : req.user.name})
})

app.get('/test', (req, res) => {
    Product.find()
    .exec()
    .then(docs => {
      console.log(docs);
      //   if (docs.length >= 0) {
      res.status(200).json(docs);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
})



app.post('/test', (req, res) => {
    console.log(req.body)
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
      });
      product
        .save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: "Handling POST requests to /products",
            createdProduct: result
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.post('/login', (req, res) => {
    res.render('index.ejs')
})
//app.post('/login',checkNotAuthenticated,passport)



app.post('/register', (req, res) => {
    res.render('index.ejs')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
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