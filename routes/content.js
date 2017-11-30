var router = require('express').Router();


router.use('/', (req, res, next) => {
    if(!req.session.user) {
        res.redirect('/signin');
    }
    else {
        next();
    }
});

router.get('/', (req, res) => {
    res.render('content', {name: req.session.user.username});
});


module.exports = router;