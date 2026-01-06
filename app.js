require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const mongoConnect = require('./config/database').mongoConnect;
const User = require('./models/user');

// Import Routes
const shopRoutes = require('./routes/shop'); // <--- IMPORTED HERE

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to find the user
app.use((req, res, next) => {
  User.findById('695b4cdeefe38078cdd855dd') // <--- Your Real ID
    .then(user => {
      // Create a new User instance to use methods like addToCart/addOrder
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => console.log(err));
});

// Use Routes
app.use(shopRoutes); // <--- USED HERE

mongoConnect(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});