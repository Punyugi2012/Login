var express = require('express');
var contacts = require('../database/contacts.js');
router = express.Router();

router.use('/:id', (req, res, next) => {
    if(req.method === 'POST' && req.body) {
        req.method = 'put';
    }
    else if(req.method === 'POST') {
        req.method = 'delete';
    }
    next();
});

router.post('/', (req, res) => {
    if(
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
    console.log('edit');
});

router.delete('/:id', (req, res) => {
    for(var i = 0; i < contacts.length; i++) {
        if(contacts[i].id === parseInt(req.params.id)) {
            contacts.splice(i, 1);
            break;
        }
    }
    res.redirect('/content');
});


module.exports = router;