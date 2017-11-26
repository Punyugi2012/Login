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
        res.send('Cant signin');
    } {
        users.forEach(function (user) {
            if (
                user.username === req.body.username &&
                user.password === req.body.password
            ) {
                req.session.user = user;
                res.send('login success');
            }
        });
        res.status(401);
        res.render('signin', { message: 'the username or password invalid.' });
    }
})


module.exports = router;