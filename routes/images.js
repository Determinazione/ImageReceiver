const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'uploads/');
    },
    filename: function(req, file, callback) {
        callback(null, `${file.fieldname}_${Date.now()}`);
    }
});
const imageFilter = function(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return callback(new Error('Only accept image file.'), false);
    }
    callback(null, true);
};
const upload = multer({ 
    //storage: storage, 
    fileFilter: imageFilter,
});
const imageModel = require('../models/image');

// Retrives the image file
router.get('/download/', function(req, res) {
    console.log(`GET method ${req.url}`);
    /*const data = imageModel.findById(req.params.id)
    .then(data => res.render('app', { items: data }))
    .catch(err => res.json({ message: err }));*/
    imageModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('app', { items: items });
        }
    })
});

// Post the image to DB
router.post('/upload', upload.single('image'), function(req, res) {
    console.log(`POST method ${req.url}`);
    const data = new imageModel({
       guildId: req.body.guildId,
       serverId: req.body.serverId,
       hashValue: req.body.hashValue,
       image: {
           data: req.file.buffer,
           contentType: req.file.contentType
       }
    });
    imageModel.create(data)
    .then(data => res.redirect('/'))
    .catch(err => res.json({ message: err }));
});  
module.exports = router;