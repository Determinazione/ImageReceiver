const router = require('express').Router();
const userModel = require('../models/user');

router.get('/signup/', function(req, res) {
    res.render('signUp');
})
router.post('/register', function (req, res) {
    const data = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    userModel.create(data)
    .then(item => res.redirect('/')) // redirect to user dashboard.
    .catch(err => res.status(400).json({ message: err }));
});

router.post('/login');
module.exports = router;