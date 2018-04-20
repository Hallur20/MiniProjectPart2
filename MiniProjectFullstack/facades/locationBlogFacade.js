var LocationBlog = require('../models/locationBlog');
var Position = require('../models/position');
module.exports = {
addPosition : function(lon, lat, id){
    var posDetail = { user: id, loc: { coordinates: [lon, lat] } };
    var position = new Position(posDetail);
    return position.save();
},
addLocationBlog : function(info, author, longitude, latitude) {
    var LocationBlogDetail = { info, pos: { longitude, latitude }, author };
    var blog = new LocationBlog(LocationBlogDetail);
    return blog.save()
},

likeLocationBlog : function() {

}
}