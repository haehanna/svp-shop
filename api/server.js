try{
	var env = require('./config/env_dev');
}
catch(err){
	var env = require('./config/env_prod');
}

var models = require('./models');
var express  = require('express');
var bodyParser = require('body-parser');
var authentication = require("./middleware/auth");
var app = express();
var bcrypt	= require('bcrypt');
var jwt		= require('jsonwebtoken');
var router 	= require('express').Router();
var multer = require('multer');

var storageDetails = multer.diskStorage({
	destination: './../app/assets/img/',
	filename: function(req, file, callback) {
		var originalname = file.originalname;
		var extension = originalname.substring(originalname.lastIndexOf('.'));
		var withoutExtension = originalname.substring(0, originalname.lastIndexOf('.'));
		var fullfilename = withoutExtension + '_' + Date.now() + extension;
		callback(null, fullfilename);
	}
});

var upload = multer({storage: storageDetails, fileSize: 2000000}).any();

app.post('/api/photo/', upload, function(req, res) {
	console.log(req.files);
	res.json(req.files);	
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + './../app'));

var jumbotron_routes = require('./routes/jumbotron_routes');
var product_routes = require('./routes/product_routes');
var auth_routes = require('./routes/auth_routes');
var user_routes = require('./routes/users_routes');
var adminjumbo_routes = require('./routes/adminjumbo_routes');
var adminprod_routes = require('./routes/adminprod_routes');

app.use('/api/jumbotrons', jumbotron_routes);
app.use('/api/products', product_routes);
app.use('/api/auth',auth_routes);
app.use('/api/users',authentication,user_routes);
app.use('/api/adminjumbo', adminjumbo_routes);
app.use('/api/adminprod', adminprod_routes);

models.sequelize.sync().then(function(){
	app.listen(env.port,function(){
		console.log('Listenting on '+env.host+':'+env.port);
		console.log('Stop server with CTRL + C');
	});
})

