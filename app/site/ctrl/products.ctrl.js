app.controller('ProductsCtrl',ProductsCtrl);

function ProductsCtrl($scope,$stateParams,productSrv,adminprodSrv,$state,api,products,jumbotrons){
	var ctrl = this;
	ctrl.productSrv = productSrv;
	ctrl.$state = $state;
	ctrl.adminprodSrv = adminprodSrv;
	ctrl.products = products;
	ctrl.jumbotrons = jumbotrons;
	ctrl.$scope = $scope;
	ctrl.activeSlide = 0;

	$scope.show=false;
	$scope.show1=false;
	$scope.show3=false;
	$scope.show4=false;

	ctrl.genders = [
		{label:'Womens', value:'Womens'},
		{label:'Mens', value:'Mens'},
		{label:'Kids', value:'Kids'},
		{label:'Unisex', value:'Unisex'},
		{label:'All Genders', value:''}
	];
	ctrl.categories = [
		{label:'Accessories', value:'Accessories'},
		{label:'Basketball', value:'Basketball'},
		{label:'Casual', value:'Casual'},
		{label:'Running', value:'Running'},
		{label:'Soccer', value:'Soccer'},
		{label:'All Categories', value:''}
	];

	ctrl.brands = [
		{label:'Adidas', value:'Adidas'},
		{label:'asics', value:'asics'},
		{label:'Herschel', value:'Herschel'},
		{label:'Nike', value:'Nike'},
		{label:'All Brands', value:''}
	];

}

ProductsCtrl.prototype.goToBrand = function(brand) {
	var ctrl = this;
	ctrl.brand = brand
	ctrl.$state.go('main.products');
    ctrl.gender = ctrl.genders[ctrl.genders.length-1];
    ctrl.category= ctrl.categories[ctrl.categories.length-1];
};
ProductsCtrl.prototype.goToCategory = function(category) {
	var ctrl = this;
	ctrl.category = category
	ctrl.$state.go('main.products');
	ctrl.gender = ctrl.genders[ctrl.genders.length-1];
    ctrl.brand = ctrl.brands[ctrl.brands.length-1];
};
ProductsCtrl.prototype.toEditProduct = function(product, productId){
	var ctrl = this;
	ctrl.$state.go('admin.editproduct',{productId:productId});
};

