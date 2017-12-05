var express = require('express');
var contacts = require('../database/contacts.js');
router = express.Router();

router.use('/:id', (req, res, next) => {
    if (req.method === 'POST' && Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        req.method = 'delete';
    }
    else if (req.method === 'POST') {
        req.method = 'put';
    }
    next();
});

router.post('/', (req, res) => {
    if (
        !req.body.first_name ||
        !req.body.last_name ||
        !req.body.phone ||
        !req.body.email
    ) {
        res.status(404).send('Not Found.');
    }
    else {
        var newContact = req.body;
        newContact.id = contacts.length ? contacts[contacts.length - 1].id + 1 : 0;
        contacts.push(newContact);
        res.redirect('/content');
    }
});

router.put('/:id', (req, res) => {
    if (
        !req.body.edit_firstn ||
        !req.body.edit_lastn ||
        !req.body.edit_phone ||
        !req.body.edit_email
    ) {
        res.status(404).send('Not Found.');
    }
    else {
        for (var i = 0; i < contacts.length; i++) {
            if (contacts[i].id === parseInt(req.params.id)) {
                contacts[i].first_name = req.body.edit_firstn;
                contacts[i].last_name = req.body.edit_lastn;
                contacts[i].phone = req.body.edit_phone;
                contacts[i].email = req.body.edit_email;
                break;
            }
        }
        res.redirect('/content');
    }
});

router.use('/', (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/signin');
    }
    else {
        next();
    }
});

router.get('/', (req, res) => {
    if (req.query.search) {
        var contactsBuffer = [];
        for (var i = 0; i < contacts.length; i++) {
            if (req.query.search === contacts[i].first_name) {
                contactsBuffer.push(contacts[i]);
            }
        }
        res.render('profile', { contacts: contactsBuffer, user: req.session.user });
    }
    else {
        res.redirect('/content');
    }
});

router.delete('/:id', (req, res) => {
    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].id === parseInt(req.params.id)) {
            contacts.splice(i, 1);
            break;
        }
    }
    res.redirect('/content');
});


module.exports = router;