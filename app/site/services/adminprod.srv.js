app.service('adminprodSrv',adminprodService);

function adminprodService($state,api){
	this.api = api;
	this.state = $state;
	this.productDetails = {};
	this.products = [];

}

adminprodService.prototype.getProducts = function(){
	var _this = this;
	return this.api.request('/adminprod',{},'GET')
	.then(function(res){
		// console.log(res);
		_this.products = res.data.products;
		return res.data.products;
	},function(res){
		// console.log(res);
		return;
	})
}

adminprodService.prototype.getProduct = function(productId){
	var _this = this;
	return this.api.request('/adminprod/'+productId,{},'GET')
	.then(function(res){
		return res.data.product;
	})
}

adminprodService.prototype.addProduct = function(product){
	var _this = this;
	this.api.request('/adminprod',product,'POST')
	.then(function(res){
		// console.log(res);
		if(res.status === 200){
			_this.products.push(res.data.product);
			_this.state.go('admin.products');
		}
	})
}

adminprodService.prototype.deleteProduct = function(productId, product){
	var _this = this;
	return this.api.request('/adminprod/'+productId,product,'DEL')
	.then(function(res){
		// console.log(res);
		if(res.status === 200){
			for(index in _this.products){
				if(_this.products[index].id == productId){
					delete _this.products[index];
				}
			}
		}
	})
}

adminprodService.prototype.updateProduct = function(product,productId){
	var _this = this; 
	this.api.request('/adminprod/'+productId,product,'PUT')
	.then(function(res){
		// console.log(res);
		if(res.status === 200){
			_this.updateProductList(product,productId);
			_this.state.go('admin.products');
		}
	})
}

adminprodService.prototype.updateProductList = function(product,productId){
	for(index in this.products){
		if(this.products[index].id == productId){
			this.products[index].title = product.title;
			this.products[index].brand = product.brand;
			this.products[index].gender = product.gender;
			this.products[index].category = product.category;
			this.products[index].details = product.details;
			this.products[index].img = product.imgname;
			this.products[index].featured = product.featured;
		}
	}
}

