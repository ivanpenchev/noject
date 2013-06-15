var db =     require('../noject/orm/db.js');
var model =  require('../noject/orm/model.js');
var fields = require('../noject/orm/fields.js');
var relationship = require('../noject/orm/relationships.js');



//create the model
model('user', {
    slug: fields.Slug({
        index: true,
        minLength: 3,
        maxLength: 20,
        required: true
    }),
    name: fields.String({
        minLength: 3,
        maxLength: 45,
        required: true
    }),
    email: fields.String({
        index: true,
        required: true
    }),
    password: fields.String({
        required: true,
        minLength: 5,
        maxLength: 15
    }),
    about: fields.String(),

    activities: relationship.out('have_done', {
        date: new Date(),
        target: 'activity'
    }),
    badges: relationship.out('has_won', {
        date: new Date(),
        target: 'badge'
    }),
    following: relationship.out('is_following', {
        date: new Date(),
        target: 'user'
    }),
    interests: relationship.out('interested_in', {
        date: new Date(),
        target: 'interest'
    }),
    friends: relationship.out('is_following', {
        date: new Date(),
        target: 'user'
    }),
    friend_requests: relationship.out('is_asking_for_friendship', {
        date: new Date(),
        target: 'user'
    }),

    customFunction: function() {
        return 5;
    }
});

model('activity', {
    name: fields.String()
});

model('badge', {
    name: fields.String()
});

