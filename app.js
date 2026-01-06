require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser'); // Make sure you have this if using forms
const path = require('path');

const mongoConnect = require('./config/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to find the user
app.use((req, res, next) => {
  User.findById('695b4cdeefe38078cdd855dd') // <--- YOUR REAL ID IS NOW HERE
    .then(user => {
      // We create a new User instance so we can use methods like addToCart
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => console.log(err));
});


mongoConnect(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});