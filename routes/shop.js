const express = require('express');
const shopController = require('../controllers/shop');

const router = express.Router();

// Define your routes here
router.post('/cart-delete-item', shopController.postCartDeleteProduct); // Added this based on your controller
router.post('/create-order', shopController.postOrder);
router.get('/orders', shopController.getOrders);

module.exports = router;