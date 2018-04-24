var userFacade = require("./userFacade");
var locationBlogFacade = require('./locationBlogFacade');
var loginFacade = require('./loginFacade');

//userFacade.getAllUsers();
//userFacade.findByUserName('hvn18');
//locationBlogFacade.addLocationBlog("this is a test place", '5ab06f1e42474807907bc671', 26, 148);
locationBlogFacade.addPositionWithPhone(12.590565,55.657541,"5ab3a9b1b7e51907d4168863", 3);//test position 1
locationBlogFacade.addPositionWithPhone(12.590565,55.657541,"5ab3a9b1b7e51907d4168866", 2);//test position 2
locationBlogFacade.addPositionWithPhone(12.590565,55.657541,"5ab3a9b1b7e51907d416886c", 4);//test position 3
loginFacade.doAll("hvn20","123",3, 12.1, 32.1); //login with phone test