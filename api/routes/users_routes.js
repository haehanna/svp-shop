var models 	= require('./../models');
var router 	= require('express').Router();

//get all users
router.get('/',function(req,res){
	models.Users.findAll()
	.then(function(users){
		res.json({users:users});
	})
})

//delete test accounts via url bar
router.get('/remove/:userId',function(req,res){
	var where = {where:{id:req.params.userId}}
	models.Users.find(where).then(function(user){
		user.destroy();
		res.json({
			deleted:true
		});	
	});
});

module.exports = router;