var express = require('express');
var router = express.Router();
var users = require('../database/users.js');

router.get('/', (req, res) => {
    res.render('signup', { message: '' });
});
router.post('/', (req, res) => {
    if (
        !req.body.username ||
        !req.body.email ||
        !req.body.password
    ) {
        res.status(404);
        res.send('Cant signup');
        return;
    }

    users.forEach(function (user) {
        if (
            user.username === req.body.username &&
            user.email === req.body.email
        ) {
            res.render('signup', { message: 'the username or email is already in use.' });
            return;
        }
        else if (
            user.username === req.body.username
        ) {
            res.render('signup', { message: 'the username is already in use.' });
            return;
        }
        else if (
            user.email === req.body.email
        ) {
            res.render('signup', { message: 'the email is already in use.' });
            return;
        }
    });
    var newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    users.push(newUser);
    res.redirect('/signin');
});

module.exports = router;