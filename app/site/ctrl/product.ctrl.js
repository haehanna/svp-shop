app.controller('ProductCtrl', ProductCtrl);

function ProductCtrl(Upload,adminprodSrv,$state,$stateParams,api,product, $scope){
	var ctrl = this;
	ctrl.adminprodSrv = adminprodSrv;
	ctrl.Upload = Upload;
	ctrl.$state = $state;
	ctrl.$stateParams = $stateParams;
	ctrl.product = product;
	ctrl.toggleFeatured(product);


	ctrl.genders = [
		{label:'Womens', value:'Womens'},
		{label:'Mens', value:'Mens'},
		{label:'Kids', value:'Kids'},
	];
	ctrl.categories = [
		{label:'Accessories', value:'Accessories'},
		{label:'Basketball', value:'Basketball'},
		{label:'Casual', value:'Casual'},
		{label:'Golf', value:'Golf'},
		{label:'Skatboard', value:'Skatboard'},
		{label:'Running', value:'Running'},
		{label:'Soccer', value:'Soccer'},
	];
	ctrl.brands = [
		{label:'Adidas', value:'Adidas'},
		{label:'asics', value:'asics'},
		{label:'Birkenstock', value:'Birkenstock'},
		{label:'Converse', value:'Converse'},
		{label:'Herschel', value:'Herschel'},
		{label:'Jansport', value:'Jansport'},
		{label:'K-Swiss', value:'K-Swiss'},
		{label:'Nike', value:'Nike'},
	];

	if ($stateParams.productId) {
		adminprodSrv.getProduct($stateParams.productId)
		.then(function(res){
			console.log(res);
			ctrl.product = res;

			for (var index in ctrl.genders){
				if(ctrl.product.gender == ctrl.genders[index].value){
				ctrl.gender = ctrl.genders[index];
				}
			}
			for (var index in ctrl.categories){
				if(ctrl.product.category == ctrl.categories[index].value){
				ctrl.category = ctrl.categories[index];
				}
			}
			for (var index in ctrl.brands){
				if(ctrl.product.brand == ctrl.brands[index].value){
				ctrl.brand = ctrl.brands[index];
				}
			}
		});
	}

}

ProductCtrl.prototype.addProduct = function(){
	var ctrl = this;
	var product = {
		title: ctrl.title,
		brand: ctrl.brand.value,
		gender: ctrl.gender.value,
		category: ctrl.category.value,
		details: ctrl.details,
		img: ctrl.imgname,
		featured: ctrl.featured
	};

	ctrl.adminprodSrv.addProduct(product);
	ctrl.$state.go('admin.products')
}

ProductCtrl.prototype.deleteProduct = function(){
	var ctrl = this;

	ctrl.adminprodSrv.deleteProduct(ctrl.product.id, ctrl.product)
	.then(function(res){
		ctrl.$state.go('admin.products');
	})
}

ProductCtrl.prototype.updateProduct = function(){
	var ctrl = this;
	// get value from <select>, stored temporarily in ng-model called ctrl.gender, then store that value in your ctrl.product
	ctrl.product.gender = ctrl.gender.value; 
	ctrl.product.category = ctrl.category.value;
	ctrl.product.brand = ctrl.brand.value;
	ctrl.product.featured = ctrl.featured;
	console.log(ctrl.product);
	ctrl.adminprodSrv.updateProduct(ctrl.product, ctrl.product.id)
}

ProductCtrl.prototype.uploadImg = function(file){
	var ctrl = this;
	
	file.upload = ctrl.Upload.upload({
			url: '/api/photo/',
			data: {file: file}
		})
		.then(function(res) {
			console.log(res);
			ctrl.imgname = res.data[0].filename;
		}, function(err) {
			console.log(err);
		})
}

ProductCtrl.prototype.toggleFeatured = function(product){
	var ctrl = this;
	if (product) {
		ctrl.featured = product.featured;
	} else {
		ctrl.featured = !ctrl.featured;
	}
	if (ctrl.featured) {
		ctrl.featureBtn = 'Click to unfeature';
	} else {
		ctrl.featureBtn = 'Click to feature';
	}
}
