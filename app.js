require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  // Ensure this ID matches the one in your database!
  User.findById('695b4cdeefe38078cdd855dd') 
    .then(user => {
      // Create user for testing if not found
      if (!user) {
         const newUser = new User({
             name: 'Atif',
             email: 'atif@test.com',
             cart: { items: [] }
         });
         return newUser.save().then(result => {
             req.user = result;
             next();
         });
      }
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(result => {
    console.log('Connected via Mongoose!');
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });