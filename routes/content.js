var router = require('express').Router();
var contacts = require('../database/contacts.js');

router.use('/', (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/signin');
    }
    else {
        next();
    }
});

router.get('/', (req, res) => {
    res.render('content', { contacts: contacts, user: req.session.user });
});


module.exports = router;