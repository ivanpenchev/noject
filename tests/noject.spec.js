var db = require('../noject/orm/db.js');
var model = require('../noject/orm/model.js');
var fields = require('../noject/orm/fields.js');



describe('Testing noject:', function() {

    describe("model object", function() {

        beforeEach(function() {
            //create customer model
            model('customer', {
                //params
                name: fields.String({
                    required: true
                }),
                email: fields.Email({
                    default: 'sample@gmail.com'
                }),
                website: fields.Url()
            }, {
                //custom functions
                mycustomfunction: function() {
                    return 'working';
                }
            });
        });

        it("should have a custom function", function() {
            var user = db.customer.create();
            expect(user.mycustomfunction()).toBe('working');
        });

        it("should have required property", function() {
            var user = db.customer.create();
            expect(user.name).toBe('');
        });

        it("should have property with default value", function() {
            var user = db.customer.create();
            expect(user.email).toBe('sample@gmail.com');
        });

        it("should NOT have property with no default or required value", function() {
            var user = db.customer.create();
            expect(user.website).toBe(undefined);
        });

    });



    describe("model instance", function() {

        beforeEach(function() {
            //create customer model
            model('customer', {
                //params
                name: fields.String({
                    required: true
                }),
                email: fields.Email({
                    default: 'sample@gmail.com'
                }),
                website: fields.Url()
            });
        });

        it("should have assigned values", function () {
            var user = db.customer.create({
                name: "Nikolai Aleksandrenko"
            });

            expect(user.name).toBe('Nikolai Aleksandrenko');
        });

        it("should NOT have assigned values that is not in the model's scheme", function () {
            var user = db.customer.create({
                notDefined: "not important string"
            });

            expect(user.notDefined).toBeUndefined();
        });
    });


    describe("model have methods", function() {
        beforeEach(function() {
            //create customer model
            model('customer', {
                //params
                name: fields.String({
                    required: true
                })
            });
        });

        it("have save method", function() {
            var user = db.customer.create();
            expect(user.save).toBeDefined();
        });

        it("have delete method", function() {
            var user = db.customer.create();
            expect(user.delete).toBeDefined();
        });

        it("have get method", function() {
            var user = db.customer.create();
            expect(user.get).toBeDefined();
        });

        it("have filter method", function() {
            var user = db.customer.create();
            expect(user.filter).toBeDefined();
        });
    });



    describe("model work with methods", function() {
        var saveDone = false;
        var deleteDone = false;
        var getDone = false;
        var filterDone = false;

        beforeEach(function() {
            model('customer', {
                name: fields.String()
            });

            //save
            runs(function() {
                var user = db.customer.create();
                user.save().success(function(data) {
                    saveDone = true;
                });
            }, 50);

            //delete
            runs(function() {
                var user = db.customer.create();
                user.delete().success(function(data) {
                    deleteDone = true;
                });
            }, 50);

            //get
            runs(function() {
                var user = db.customer.create();
                user.get().success(function(data) {
                    getDone = true;
                });
            }, 50);

            //filter
            runs(function() {
                var user = db.customer.create();
                user.filter().success(function(data) {
                    filterDone = true;
                });
            }, 50);

            waitsFor(function() {
                var returnVal = false;

                if(saveDone && deleteDone && getDone && filterDone) {
                    returnVal = true;
                }

                return returnVal;
            }, "Timeout", 5000);
        });

        // its ...

        it("use create({data});", function() {
            var user = db.customer.create();
            expect(user).toBeDefined();
        });

        it("use create();", function() {
            var user = db.customer.create({
                name: 'nikolai aleksandrenko'
            });
            expect(user).toBeDefined();
        });

        it("use save();", function () {
            expect(saveDone).toBe(true);
        });

        it("use delete();", function () {
            expect(deleteDone).toBe(true);
        });

        it("use get();", function () {
            expect(getDone).toBe(true);
        });

        it("use filter();", function () {
            expect(filterDone).toBe(true);
        });
    });


    describe("model have validation", function() {
        beforeEach(function() {
            //create customer model
            model('customer', {
                //params
                string: fields.String({
                    minLength: 10,
                    maxLength: 20
                }),
                email: fields.Email(),
                boolean: fields.Boolean(),
                int: fields.Int({
                    min: 10,
                    max: 100
                }),
                number: fields.Number({
                    min: 10,
                    max: 100
                }),
                url: fields.Url(),
                img: fields.Img(),
                data: fields.Data(),
                dataTime: fields.DataTime(),
                slug: fields.Slug()
            });
        });

        it("Valid String Type", function() {
            var user = db.customer.create();

            user.string = 'valid string';

            expect(user.validate().error).toBeFalsy();
        });

        it("NOT Valid String Type", function() {
            var user = db.customer.create();
            user.string = 5;
            expect(user.validate().error).toBeTruthy();
        });



        it("Valid Boolean Type", function() {
            var user = db.customer.create();
            user.boolean = false;
            expect(user.validate().error).toBeFalsy();
        });

        it("NOT Valid Boolean Type", function() {
            var user = db.customer.create();
            user.boolean = 'string';
            expect(user.validate().error).toBeTruthy();
        });



        it("Valid Int Type", function() {
            var user = db.customer.create();
            user.int = 3;
            expect(user.validate().error).toBeFalsy();
        });

        it("NOT Int Boolean Type (String)", function() {
            var user = db.customer.create();
            user.int = 'not valid type';
            expect(user.validate().error).toBeTruthy();
        });

        it("NOT Int Boolean Type (Float)", function() {
            var user = db.customer.create();
            user.int = 1.2;
            expect(user.validate().error).toBeTruthy();
        });


        it("Valid Email Type", function() {
            var user = db.customer.create();
            user.email = 'valid@email.com';
            expect(user.validate().error).toBeFalsy();
        });

        it("NOT Valid Email Type", function() {
            var user = db.customer.create();
            user.email = 'string';
            expect(user.validate().error).toBeTruthy();
        });


        it("Valid Url Type", function() {
            var user = db.customer.create();
            user.url = 'http://www.domain.com';
            expect(user.validate().error).toBeFalsy();
        });

        it("NOT Valid Url Type", function() {
            var user = db.customer.create();
            user.url = 'string';
            expect(user.validate().error).toBeTruthy();
        });


        it("Valid Number Type (Float)", function() {
            var user = db.customer.create();
            user.number = 10.2;
            expect(user.validate().error).toBeFalsy();
        });

        it("Valid Number Type (Int)", function() {
            var user = db.customer.create();
            user.number = 10;
            expect(user.validate().error).toBeFalsy();
        });

        it("NOT Valid Number Type", function() {
            var user = db.customer.create();
            user.number = 'string';
            expect(user.validate().error).toBeTruthy();
        });



        it("Valid Img Type (.png)", function() {
            var user = db.customer.create();
            user.img = 'http://www.domain.com/img.png';
            expect(user.validate().error).toBeFalsy();
        });

        it("Valid Img Type (.jpg)", function() {
            var user = db.customer.create();
            user.img = 'http://www.domain.com/img.jpg';
            expect(user.validate().error).toBeFalsy();
        });

        it("NOT Valid Img Type (email)", function() {
            var user = db.customer.create();
            user.img = 'alek@as.com';
            expect(user.validate().error).toBeTruthy();
        });

        it("NOT Valid Img Type (url)", function() {
            var user = db.customer.create();
            user.img = 'http://www.domain.com/';
            expect(user.validate().error).toBeTruthy();
        });

        it("NOT Valid Img Type", function() {
            var user = db.customer.create();
            user.img = 'string';
            expect(user.validate().error).toBeTruthy();
        });



        it("Valid Slug Type", function() {
            var user = db.customer.create();
            user.slug = 'valid-slug';
            expect(user.validate().error).toBeFalsy();
        });

        it("Valid Slug Type", function() {
            var user = db.customer.create();
            user.slug = 'valid_slug';
            expect(user.validate().error).toBeFalsy();
        });

        it("NOT Valid Slug Type", function() {
            var user = db.customer.create();
            user.slug = 'not valid slug';
            expect(user.validate().error).toBeTruthy();
        });

        it("NOT Valid Slug Type (int)", function() {
            var user = db.customer.create();
            user.slug = 0;
            expect(user.validate().error).toBeTruthy();
        });

        it("NOT Valid Slug Type (boolean)", function() {
            var user = db.customer.create();
            user.slug = false;
            expect(user.validate().error).toBeTruthy();
        });


        it("Valid Date Type (from string)", function() {
            var user = db.customer.create();
            user.date = '01.01.2013';
            expect(user.validate().error).toBeFalsy();
        });

        it("Valid Date Type (from date object)", function() {
            var user = db.customer.create();
            user.date = new Date();
            expect(user.validate().error).toBeFalsy();
        });



        it("Valid DateTime Type (from date object - now())", function() {
            var user = db.customer.create();
            user.dateTime = new Date();
            expect(user.validate().error).toBeTruthy();
        });


    });

});