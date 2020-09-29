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
    /*imageModel.find({})
    .then(items => res.render('app', { items: items }))
    .catch(err => res.json({ message: err }));*/
    imageModel.find({}, function(err, docs) {
        if (err) {
            console.log("kkkk");
            return;
        }
        res.render('app', { items: docs });
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
    .then(item => res.redirect('/'))
    .catch(err => res.json({ message: err }));
});  
module.exports = router;