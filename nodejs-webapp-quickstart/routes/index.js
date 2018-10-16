'use strict';
var express = require('express');
var router = express.Router();

let orders = []; // "In-memory database" for orders

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Home Page' });
});

/* POST a new order. */
router.post('/order', function (req, res) {
    let order = req.body;
    order.position = orders.length + 1;

    // Hack for making toppings an Array
    if (order.toppings) {
        order.toppings = typeof(order.toppings) === 'string' ? [order.toppings] : order.toppings;
    }

    // Consider: invalid input.
    
    orders.push(order);

    res.render('order_submitted', { title: 'Order Submitted', order });
});

/* GET order page. */
router.get('/order', function (req, res) {
    res.render('order', { title: 'Order Page' });
});

module.exports = router;
