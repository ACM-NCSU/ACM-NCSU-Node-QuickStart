'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Home Page' });
});

/* GET new page. */
router.get('/login', function (req, res) {
    res.render('login', { title: 'Login Page' });
});


module.exports = router;
