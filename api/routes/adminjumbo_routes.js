var models = require('../models');
var express = require('express');
var router = express.Router();

//get jumbotronz
router.get('/',function(req,res){
	models.Jumbotron.findAll().then(function(jumbotrons){
		res.json({
			jumbotrons:jumbotrons
		});
	});
});

//get one
router.get('/:jumbotronId',function(req,res){
	console.log('Getting Entry with Id:'+req.params.jumbotronId);
	var where = {where:{id:req.params.jumbotronId}};
	models.Jumbotron.find(where).then(function(jumbotron){
		res.json({
			jumbotron:jumbotron
		});
	});
});

//post new jumbotron
router.post('/',function(req,res){
	var jumbotron = req.body;
	models.Jumbotron.create(jumbotron).then(function(jumbotron){
		res.json({
			jumbotron:jumbotron
		});
	});
});

router.delete('/:jumbotronId',function(req,res){
	var where = {where:{id:req.params.jumbotronId}}
	models.Jumbotron.find(where).then(function(jumbotron){
		console.log(jumbotron)
		jumbotron.destroy();
		res.json({
			deleted:true
		});
	});
});

router.put('/:jumbotronId',function(req,res){
	var where = {where:{id:req.params.jumbotronId}}
	var __jumbotron = req.body;
	models.Jumbotron.find(where).then(function(jumbotron){
		jumbotron.updateAttributes({
			title:__jumbotron.title,
			img:__jumbotron.img,
			active:__jumbotron.active,
		});
		__jumbotron.id = req.params.jumbotronId;
		res.json({
			jumbotron:__jumbotron
		});
	});
});

module.exports = router;


