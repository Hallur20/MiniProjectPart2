require("./dbSetup");
var User = require("./models/user.js");
var LocationBlog = require("./models/locationBlog");
var Position = require("./models/position");
var mongoose = require("mongoose");

function userCreate(firstName, lastName, userName, password, type, company, companyURL) {
    var job = [{ type, company, companyURL }, { type, company, companyURL }]; //silly adding same job twice
    var user = { firstName, lastName, userName, password, job: job };
    var u = new User(user);
    return u.save();
}
function positionCreator(lon, lat, userId) {
    var posDetail = { user: userId, loc: { coordinates: [lon, lat] } };
    var position = new Position(posDetail);
    return position.save();
}
function LocationBlogCreator(info, author, longitude, latitude) {
    var LocationBlogDetail = { info, pos: { longitude, latitude }, author };
    var blog = new LocationBlog(LocationBlogDetail);
    return blog.save()
}
async function createUsers() {
    await User.remove({}); //wait for -> removes everything in user model.
    await Position.remove({}); //then wait for -> removes everything in the position model.
    await LocationBlog.remove({});
    var userPromises = [
        userCreate("kurt", "jensen", "hvn17", "123", "xxx", "comp", "comp.url"),
        userCreate("hallur", "vid neyst", "hvn18", "123", "xxx", "comp", "comp.url"),
        userCreate("hallur", "vid neyst", "hvn19", "123", "xxx", "comp", "comp.url"),
        userCreate("hallur", "vid neyst", "hvn20", "123", "xxx", "comp", "comp.url"),
        userCreate("hallur", "vid neyst", "hvn21", "123", "xxx", "comp", "comp.url")
    ];

    var users = await Promise.all(userPromises);
    var positionPromises = [
        positionCreator(123, 123, users[0]._id),
        positionCreator(123, 123, users[1]._id),
        positionCreator(123, 123, users[2]._id),
        positionCreator(123, 123, users[3]._id),
        positionCreator(123, 123, users[4]._id),
    ];
    var positions = await Promise.all(positionPromises);

    var blogPromises = [
        LocationBlogCreator("Cool Place", users[0]._id, 26, 148),
        LocationBlogCreator("Another Cool Place", users[0]._id, 56, 56),
        LocationBlogCreator("Yet Another Cool Place", users[0]._id, 156, 56),
        LocationBlogCreator("The coolest Place", users[3]._id, 156, 56),
    ];
    console.log("we have arrived here.");
    var blogs = await Promise.all(blogPromises);
    console.log("are we here?");
    console.log(users);
    console.log(positions);
    console.log(blogs);
}
createUsers();
/*userCreate("hallur", "vid neyst", "hvn16", "123", "xxx", "comp", "comp.url")
.then(data=>{
    console.log("data is: " + data);
    positionCreator(156, 26, data._id)
    .then(p => console.log(p));
});*/