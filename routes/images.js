const express = require('express');
const { post } = require('../app');
const router = express.Router();
const image = require('../models/image');

router.get('/download', function(req, res) {
    console.log(`GET method ${req.url}`);
    const data = image.find()
    .then(data => res.json(data), err => res.json({ message: err }));
});

router.post('/upload', function(req, res) {
    console.log(`POST method ${req.url}`);
    const data = new image({
        
    });
    data.save()
    .then(data => res.json(data), err => res.json({ message: err }));
});  
module.exports = router;