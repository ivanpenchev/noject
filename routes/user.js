
/*
 * GET users listing.
 */

"use strict";



var db = require('noject').db;
var model = require('noject').model;
var fields = require('noject').fields;

model('user', {
    username: fields.String({
        unique: true,
        index: true,
        minLength: 3,
        maxLength: 15,
        default: ''
    }),
    email: fields.Email({
        unique: true,
        index: true
    }),
    friends: fields.Rel('is_friend_with', {
        target: 'user',
        noun: 'friend',
        plural: 'friends'
    })
});

console.log('-------------------------------------------');

//console.log(db);

/*
var nikolai = db.user.create();
nikolai.email = 'aleksandrenko@gmail.com';
nikolai.username = 'aleksandrenko';

var svilena = db.user.create({
    email: 'svilena_slavev@gmail.com',
    username: 'svilslavev'
});


console.log(svilena);


nikolai.save().then(function() {
    return svilena.save();
}).then(function() {
        return nikolai.addFriend(svilena.id);
    }).then(function() {
        console.log(nikolai.id + ':' + svilena.id);
    });
*/



exports.list = function(req, res) {
    db.user.getAll().then(function(users) {
        //res.send(users[0]);

        res.render('', {
            data: users,
            layout: 'users'
        });

    }).fail(function(err) {
        console.log(err);
    });

};

exports.details = function(req, res) {
    var id = req.params.id;

    db.user.getById(id).then(function(user) {

        res.render('', {
            data: user,
            layout: 'details'
        });

    }).fail(function(err) {
        res.send(err);
    });
};





exports.crud = function(req, res) {

    if(req.method === "POST") {

        var id = req.params.id;

        db.user.getById(id).then(function(user) {

            user.username = req.body.username;
            user.email = req.body.email;
            return user.save();

        }).then(function(user) {

            console.log(user);

            res.render('', {
                data: user,
                layout: 'crud'
            });
        }).fail(function(err) {
            res.send(err);
        });

    } else {
        var id = req.params.id;

        db.user.getById(id).then(function(user) {

            res.render('', {
                data: user,
                layout: 'crud'
            });

        }).fail(function(err) {
            res.send(err);
        });
    }
};





exports.create = function(req, res) {

    if(req.method === "POST") {
        var user = db.user.create();
        user.username = req.body.username;
        user.email = req.body.email;

        user.save().then(function() {
            res.render('', {
                data: user,
                layout: 'create'
            });
        }).fail(function(err) {
            res.send(err);
        });

    } else {
        res.render('', {
            layout: 'create'
        });
    }
};