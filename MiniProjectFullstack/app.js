require("./dbSetup");
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require("./models/user.js");
var userFacade = require("./facades/userFacade.js");
var locationBlogFacade = require('./facades/locationBlogFacade.js');

var app = express();
app.set('view-engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.listen('3000', () => {
    console.log("server started");
});
+
app.get('/', (req, res) => {
    User.find({}, (err, users)=>{
        res.render('index.ejs', {users: users, status: ""});
    })
});
//this is for the app in order to login - shows the users in json format in rest endpoint...
app.post('/phoneLogin', (req, res)=>{
    res.send("username:" + req.body.uname + ", password:" + req.body.password+ ", radius: " + req.body.radius);
        User.find({}, (err, users) => {
            if (err) throw new Exception({msg: "wrong username or password", status: 403});
            for (var i = 0; i < users.length; i++) { //loop through users
                if (users[i].userName === req.body.uname && users[i].password === req.body.password) { //if user and its password exists
                    var id = users[i]._id;
                    //lon, lat, id
                    locationBlogFacade.addPositionWithPhone(req.body.lon, req.body.lat, id, req.body.radius);
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
                        res.send(arr);
                        return;
                    })
                }
            }
        })
})
app.get('/test', (req, res) => {
    res.send("<h1>hello?</h1>");
});
app.post('/login', (req, res) => {
    var usr = req.body.uName;
    var pswd = req.body.psw;
    User.findOne({ 'userName': usr }, (err, user) => {
        if (err) throw err;
        if(user == null){
            res.send('user does not exist <a href="http://localhost:3000">go back</a>');
            return;
        }
        if (pswd == user.password) {
            res.render('login.ejs', {user: user, status : "false"});
        } else {
            res.send('user was correct, but password was wrong <a href="http://localhost:3000">go back</a>');
        }
    }
    );

});
app.post('/create', (req, res) => {
    var getJobs = [];
    if (req.body.jobType1) {
        getJobs.push({ type: req.body.jobType1, company: req.body.jobCompany1, companyURL: req.body.jobCompanyUrl1 });
    }
    if (req.body.jobType2) {
        getJobs.push({ type: req.body.jobType2, company: req.body.jobCompany2, companyURL: req.body.jobCompanyUrl2 });
    }
    if (req.body.jobType3) {
        getJobs.push({ type: req.body.jobType3, company: req.body.jobCompany3, companyURL: req.body.jobCompanyUrl3 });
    }
    var fName = req.body.fName;
    var lName = req.body.lName;
    var uName = req.body.uName;
    var psw = req.body.psw;
    console.log(getJobs);
    userFacade.addUser(fName, lName, uName, psw, getJobs).then((data)=>{
        User.find({}, (err, users) => {
            console.log(data);
            res.render("index.ejs", {users: users, status : data});
        }
    )})
})
app.post('/login/createPosition', (req, res)=>{
    locationBlogFacade.addPosition(req.body.lon, req.body.lat, req.body.id).then((data)=>{
        User.findOne({ '_id': req.body.id }, (err, user)=>{
            if(err) throw err;
            res.render("login.ejs", {user: user, status: "true", lon: ""+req.body.lon, lat: ""+req.body.lat});
        })
}
)}
);
app.post('/login/createLocationBlog', (req, res)=>{
    //info, author, lon, lat
    if(req.body.Binfo === ""){
        res.send("fail");
        return;
    }
    locationBlogFacade.addLocationBlog(req.body.Binfo, req.body.Bauthor, req.body.Blon, req.body.Blat).then((data)=>{
        res.send("success <a href='http://localhost:3000'>click here to log out... your blog was created!</a>");
    });

})