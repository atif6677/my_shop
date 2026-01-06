exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  
  // req.user must be an instance of the User class for this to work
  req.user
    .deleteItemFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};