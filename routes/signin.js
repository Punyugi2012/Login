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
        var found = false;
        for(var i = 0; i < users.length; i++) {
            if (
                users[i].username === req.body.username &&
                users[i].password === req.body.password
            ) {
                req.session.user = users[i];
                res.redirect('/content');
                found = true;
                break;
            }   
        }
        if(!found) {
            res.render('signin', { message: 'the username or password is invalid.' });
        }
    }
})




module.exports = router;