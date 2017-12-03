var express = require('express');
var router = express.Router();

router.use('/', (req, res, next) => {
    if(!req.session.user) {
        res.redirect('/signin');
    }
    else {
        next();
    }
});
router.get('/', (req, res) => {
    req.session.destroy(function() {
        console.log('User Logouted.');
    });
    res.redirect('/signin');
});

module.exports = router;