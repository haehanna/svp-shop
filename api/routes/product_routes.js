var models = require('../models');
var express = require('express');
var router = express.Router();

//get products
router.get('/',function(req,res){
	models.Product.findAll().then(function(products){
		res.json({
			products:products
		});
	});
});

//get one product
router.get('/:productId',function(req,res){
	console.log('Getting Entry with ID:' +req.params.productId);
	var where = {where:{id:req.params.productId}};
	models.Product.find(where).then(function(product){
		res.json({
			product:product
		});
	});
});

//post new product
router.post('/', function(req,res){
	var product = req.body;
	models.Product.create(product).then(function(product){
		res.json({
			product:product
		});
	});
});

//delete product
router.delete('/:productId',function(req,res){
	var where = {where:{id:req.params.productId}}
	models.Product.find(where).then(function(product){
		console.log(product)
		product.destroy();
		res.json({
			deleted:true
		});
	});
});

//update product
router.put('/:productId',function(req,res){
	var where = {where:{id:req.params.productId}}
	var __product = req.body;
	models.Product.find(where).then(function(product){
		product.updateAttributes({
			title:__product.title,
			brand:__product.brand,
			gender:__product.gender,
			category:__product.category,
			details:__product.details,
			img:__product.img,
		});

		__product.id = req.params.productId;
		res.json({
			product:__product
		});
	});
});


module.exports = router;

