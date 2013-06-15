"use strict";

var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path'),
    hbs = require('hbs');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');


app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


var db = require('noject').db;
var model = require('noject').model;
var fields = require('noject').fields;

model('user', {
    username: fields.String({
        unique: true,
        index: true,
        minLength: 3,
        maxLength: 15,
        default: 'def'
    }),
    email: fields.Email({
        unique: true,
        index: true
    }),
    friends: fields.Rel('is_friend_with', {
        target: 'user',
        noun: 'friend',
        plural: 'friends'
    }),

});

console.log('-------------------------------------------');


db.user.getById(497).done(function (newmodel) {
    //newmodel.username = 'aleksandrenko';

    //newmodel.save();

    console.log(newmodel);
    //newmodel.addFriend(495);

    newmodel.getFriends().done(function(friends) {
        console.log(friends);
    });

}).fail(function (err) {
        console.log(err);
    });


/*
 var newuser = db.user.create({
 username: 'nikolai_aleksandrenko',
 email: 'aleksandrenko@gmail.com'
 });

 newuser.delete().done(function() {
 console.log(newuser);
 });



 //console.log(newuser);
 //console.log('-------------------------------------------');
 //console.log(newuser.data());

 //console.log('-------------------------------------------');

 var newuser2 = db.user.create({
 username: 'svilena_slavev',
 email: 'svilena_slavev@gmail.com'
 });

 console.log(newuser2);
 console.log('-------------------------------------------');


 console.log(newuser.getData());
 console.log('-------------------------------------------');
 */

/*
 newuser2.save().done(function(data) {
 console.log('save success');
 console.log(newuser2.id);
 }).fail(function(err) {
 console.log('save error');
 console.log(err);
 });
 */


// console.log('');
//console.log(newuser);
//console.log(db);


//======================================================================

/*
 var db      = require('./noject/orm/db.js');
 var model   = require('./noject/orm/model.js');

 //to create and load models in db you have to require/load the models
 require('./models/user');

 var nikolai =  db.user.create();
 nikolai.name = 'nikolai aleksandrenko';
 nikolai.email = 'nikolai@gmail.com';
 nikolai.slug = 'nikolai_alexndr';
 nikolai.password = '$#%^&%$^#%@';

 nikolai.save()
 .success(function(data) {
 console.log('success');
 }).error(function(data){
 console.log(data);
 });

 console.log(nikolai);

 //======================================================================
 // rest api test with neo4j api
 //======================================================================

 var neo4j = require('neo4j');
 var db = new neo4j.GraphDatabase('http://localhost:7474');

 */

/* create, save, get, delete

 var node = create();
 save(node, function(err) {
 console.err('Error saving new node to database:', err);
 }, function(data) {
 console.log('Node saved to database with id:', node.id);

 console.log('');
 console.log('@get by id');
 getById(node.id, function(err) {
 console.log(err);
 }, function(node) {
 console.log('node getted successful by id');
 console.log('node id: ' + node.id);

 console.log('');
 console.log('@delete node');
 del(node, function(err) {
 console(err);
 }, function() {
 console.log('node is deleted successfull');
 });
 });
 });
 */


//unique
//index
/*
 var node = db.createNode({sampleDataKey: "sampleDataValue"});

 node.save(function (err, user) {
 if(err) {
 console.log(err);
 } else {
 node.index('user', 'indexValue', 'indexValue4', function (err) {
 if (err) console.log(err);
 console.log(user.id);
 });
 }
 });
 */



