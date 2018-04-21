require('../dbSetup');
var User = require('../models/user');
var locationBlogFacade = require('./locationBlogFacade');
var Position = require('../models/position');
module.exports = {
    doAll: function (name, psw, distance, lon, lat) {
        //first check username and password is correct
        User.find({}, (err, users) => {
            if (err) throw new Exception({msg: "wrong username or password", status: 403});
            for (var i = 0; i < users.length; i++) { //loop through users
                if (users[i].userName === name && users[i].password === psw) { //if user and its password exists
                    var id = users[i]._id;
                    //lon, lat, id
                    locationBlogFacade.addPositionWithPhone(lon, lat, id, distance);
                    Position.find({ _id: { $ne: id } }, (err, positions) => {
                        if (err) throw err;
                        var arr = { friends: positions };
                        var mapped = arr.friends.map((friend)=>{
                            var username;
                            for(var i = 0; i < users.length; i++){
                                if(JSON.stringify(friend.user) === JSON.stringify(users[i]._id)){ //works only if objects are converted to json strings...
                                    username = users[i].userName;
                                }
                            }
                            return {"username": username, "latitude":friend.loc.coordinates[1], "longitude":friend.loc.coordinates[0]};
                        });
                        arr = {friends: mapped};
                        console.log(arr);
                        return;
                    })
                }
            }
        })

        //then if it is correct create a post request with all users using the app
    }
}