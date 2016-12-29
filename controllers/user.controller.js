const express = require('express'),
    User = require('../models/user');

var UserController = express.Router();

UserController.get('/', function (req, res) {
    var users = User.find({}, function (err, results) {
        if (err) throw new Error(err.message);
        console.log(results);
        res.status(200).send(results);
    });

});

UserController.post('/:id/addlocation', function (req, res) {
    var long = req.body.long;
    var lat = req.body.lat;

    User.findByIdAndUpdate(req.params.id, {
        geo: {
            type: 'Point',
            coordinates: [long, lat]
        }
    }, function (err, user) {
        if (err) throw err;
        console.log('Add location');
    });

});

UserController.get('/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) throw err;

        if (user === null) {
            res.status(404).send({
                code: 404,
                error: 'UserNotFound',
                message: 'user with id not found.'
            });
        } else {
            res.status(200).send(user);
        }
    });
});

UserController.post('/', function (req, res) {
    var postData = req.body;

    // create a new user called chris
    var chris = new User({
        name: postData.name,
        username: postData.username,
        password: postData.password
    });

    // call the custom method. this will just add -dude to his name
    // user will now be Chris-dude
    chris.dudify(function (err, name) {
        if (err) throw err;
        console.log('Your new name is ' + name);
    });

    // call the built-in save method to save to the database
    chris.save(function (err) {
        if (err) throw err;

        console.log('User saved successfully!');
    });
});

UserController.put('/:id', function (req, res) {
    var userData = req.body;
    var params = req.params;
    var query = req.query;

    User.findByIdAndUpdate(params.id, { username: userData.username }, function (err, user) {
        if (err) throw err;
        // we have the updated user returned to us
        console.log(user);
        res.status(200).send(user);
    });

    //res.status(200).send({ queryParams: params, queryString: query });
});

module.exports = UserController;