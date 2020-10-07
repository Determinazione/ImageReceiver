var router = require('express').Router();

router.get('/404', function(req, res, next) {
    next();
});

router.use('/403', (req, res, next) => {
    var err = new Error('not allowed');
    err.status = 403;
    next(err);
})

router.use('/500', function(req, res, next) {
    next(new Error('keyboard cat'));
})

router.use(function(req, res, next) {
    res.status(404);
    res.format({
        html: function() {
            res.render('errors/404', { url: req.url });
        },
        json: function() {
            res.json({ error: 'Not found' })
        },
        default: function() {
            res.type('txt').send('Not found')
        }
    })
});

// Error handling
router.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('errors/500', { error: err });
});

module.exports = router;
