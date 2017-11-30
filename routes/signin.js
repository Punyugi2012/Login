var express = require('express');
var router = express.Router();
var users = require('../database/users.js');


router.get('/', (req, res) => {
    res.render('signin', { message: '' });
});
router.post('/', (req, res, next) => {
    if (
        !req.body.username ||
        !req.body.password
    ) {
        res.status(404);
        res.send('Cant Signin.');
    }
    else {
        users.forEach(function (user) {
            if (
                user.username === req.body.username &&
                user.password === req.body.password
            ) {
                req.session.user = user;
                res.redirect('/content');
                return;
            }
        });
        res.render('signin', { message: 'the username or password is invalid.' })
    }
})




module.exports = router;