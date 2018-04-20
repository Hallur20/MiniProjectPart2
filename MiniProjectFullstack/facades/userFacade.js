require('../dbSetup');
var User = require('../models/user');

module.exports = {
    addUser: function (firstName, lastName, userName, password, jobsArray) {
        var jobs = [];
        for (var i = 0; i < jobsArray.length; i++) {
            jobs.push({
                type: jobsArray[i].type,
                company: jobsArray[i].company,
                companyURL: jobsArray[i].companyURL
            });
        }
        var user = { firstName, lastName, userName, password, job: jobs };
        var u = new User(user);
        return u.save();
    },
    

    getAllUsers: function () {
        User.find({}, (err, users)=>{
            if(err) throw err;
            console.log(users);
        })
    },

    findByUserName: function (username) {
        User.find({userName : username}, (err, users)=>{
            if(err) throw err;
            console.log(users);
        })
    }
}