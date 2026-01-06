require('dotenv').config(); 

const express = require('express');
const mongoConnect = require('./config/database').mongoConnect;
const User = require('./models/user'); // Import User model here



const app = express();

// ... your middleware and routes ...


app.use((req, res, next) => {
  User.findById('YOUR_HARDCODED_USER_ID_HERE')
    .then(userData => {
      // Create a class instance so we can use methods like addToCart and deleteItemFromCart
      req.user = new User(userData.name, userData.email, userData.cart, userData._id);
      next();
    })
    .catch(err => console.log(err));
});

mongoConnect(() => {
  // 1. Database is now connected!
  
  // 2. Create the user only now
  const user = new User('Atif', 'atif@test.com');
  user.save()
    .then(() => {
        // 3. Start the server only after user is saved (optional, but safe)
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch(err => console.log(err));
});