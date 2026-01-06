const mongodb = require('mongodb');
const getDb = require('../config/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart ? cart : { items: [] };
    this._id = id ? new ObjectId(id) : null;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity
      });
    }
    const updatedCart = { items: updatedCartItems };
    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: this._id },
        { $set: { cart: updatedCart } }
      );
  }

  // --- FIXED METHOD ---
  deleteItemFromCart(productId) {
    const updatedCartItems = this.cart.items.filter(item => {
      // Filter out the item that matches the productId
      return item.productId.toString() !== productId.toString();
    });

    const db = getDb();
    
    return db
      .collection('users')
      .updateOne( // Typo fixed here (was updateOnexB)
        { _id: this._id },
        { $set: { cart: { items: updatedCartItems } } }
      );
  }
  // --------------------

  static findById(userId) {
    const db = getDb();
    return db.collection('users')
      .find({ _id: new ObjectId(userId) })
      .next()
      .then(user => {
        return user;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = User;