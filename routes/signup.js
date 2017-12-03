var express = require('express');
var router = express.Router();
var users = require('../database/users.js');

router.get('/', (req, res) => {
    res.render('signup', { message: '' });
});
router.post('/', (req, res) => {
    if (
        !req.body.name ||
        !req.body.username ||
        !req.body.email ||
        !req.body.password
    ) {
        res.status(404);
        res.send('Cant signup.');
    }
    else {
        var duplicate = false;
        for (var i = 0; i < users.length; i++) {
            if (
                users[i].username === req.body.username &&
                users[i].email === req.body.email
            ) {
                res.render('signup', { message: 'the username or email is already in use.' });
                duplicate = true;
                break;
            }
            else if (
                users[i].username === req.body.username
            ) {
                res.render('signup', { message: 'the username is already in use.' });
                duplicate = true;
                break;
            }
            else if (
                users[i].email === req.body.email
            ) {
                res.render('signup', { message: 'the email is already in use.' });
                duplicate = true;
                break;
            }
        }
        if (!duplicate) {
            var newUser = {
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }
            users.push(newUser);
            res.redirect('/signin');
        }
    }
});

module.exports = router;