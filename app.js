const express = require('express');
const expressLayouts=require('express-ejs-layouts');
const passport = require('passport');
const flash=require('connect-flash')
const session=require('express-session')
const mongoose = require('mongoose');

const app = express();
require('./config/passport')(passport)

//EJS
app.use(expressLayouts)
app.set('view engine','ejs')

//bodyparser

app.use(express.urlencoded({extended:false}));
 
//express sessio

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);


app.use(passport.initialize())
app.use(passport.session())
//flash

app.use(flash())

//middleware
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
// Connect to MongoDB


mongoose.connect('mongodb://127.0.0.1:27017/passport', {
    useNewUrlParser: true,
    useCreateIndex: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS


// Express body parser



// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));


const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
