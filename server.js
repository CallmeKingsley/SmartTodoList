const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const morgan = require('morgan');
const passport  = require('passport');
const flash = require('express-flash');
const session  = require('express-session');

app.set('view-engine', 'ejs');
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
//app.use(flash())

app.get('/', (req, res) => {
    res.render('index.ejs')
  })

app.listen(3000,()=>{
    console.log("connected")
})