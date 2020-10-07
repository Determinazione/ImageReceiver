const router = require('express').Router();
const userModel = require('../models/user');
const {registerValidation} = require('../models/validation')

router.get('/signup/', function(req, res) {
    res.render('signUp');
});

router.post('/register', function (req, res) {
    const error = registerValidation(req.body);
    if (error) res.status(400).send(error);
    const data = new userModel({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    });
    userModel.create(data)
    .then(item => res.redirect('/')) // redirect to user dashboard.
    .catch(err => res.status(400).json({ message: err }));
});

router.post('/login');
module.exports = router;