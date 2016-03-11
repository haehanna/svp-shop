app.service('productSrv',ProductService);

function ProductService($state,api){
	this.api = api;
	this.state = $state;
	this.productDetails = {};
	this.products = [];
}

ProductService.prototype.getProducts = function(){
	var _this = this;
	return this.api.request('/products',{},'GET')
	.then(function(res){
		console.log(res);
		_this.products = res.data.products;
		return res.data.products;
	},function(res){
		console.log(res);
		return;
	})
}

ProductService.prototype.getProduct = function(productId){
	var _this = this;
	return this.api.request('/products/'+productId,{},'GET')
	.then(function(res){
		return res.data.product;
	})
}

ProductService.prototype.addProduct = function(product){
	var _this = this;
	this.api.request('/products',product,'POST')
	.then(function(res){
		console.log(res);
		if(res.status === 200){
			_this.products.push(res.data.product);
			_this.state.go('admin.products');
		}
	})
}

ProductService.prototype.deleteProduct = function(productId, product){
	var _this = this;
	return this.api.request('/products/'+productId,product,'DEL')
	.then(function(res){
		console.log(res);
		if(res.status === 200){
			for(index in _this.products){
				if(_this.products[index].id == productId){
					delete _this.products[index];
				}
			}
		}
	})
}

ProductService.prototype.updateProduct = function(product,productId){
	var _this = this; 
	this.api.request('/products/'+productId,product,'PUT')
	.then(function(res){
		console.log(res);
		if(res.status === 200){
			_this.updateProductList(product,productId);
			_this.state.go('admin.products');
		}
	})
}

ProductService.prototype.updateProductList = function(product,productId){
	for(index in this.products){
		if(this.products[index].id == productId){
			this.products[index].title = product.title;
			this.products[index].brand = product.brand;
			this.products[index].gender = product.gender;
			this.products[index].category = product.category;
			this.products[index].details = product.details;
			this.products[index].img = product.img;
		}
	}
}

