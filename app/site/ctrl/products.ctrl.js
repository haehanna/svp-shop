app.controller('ProductsCtrl',ProductsCtrl);

function ProductsCtrl($scope,productSrv,$state,api,products,jumbotrons){
	var ctrl = this;
	ctrl.productSrv = productSrv;
	ctrl.$state = $state;
	ctrl.products = products;
	ctrl.jumbotrons = jumbotrons;
	ctrl.$scope = $scope;

	$scope.show=false;

	ctrl.genders = [
		{label:'Womens', value:'Womens'},
		{label:'Mens', value:'Mens'},
		{label:'Kids', value:'Kids'},
		{label:'All', value:''}
	];
	ctrl.gender = ctrl.genders[3];
	ctrl.categories = [
		{label:'Accessories', value:'Accessories'},
		{label:'Basketball', value:'Basketball'},
		{label:'Casual', value:'Casual'},
		{label:'Golf', value:'Golf'},
		{label:'Skatboard', value:'Skatboard'},
		{label:'Running', value:'Running'},
		{label:'Soccer', value:'Soccer'},
		{label:'All', value:''}
	];
	ctrl.category = ctrl.categories[7];
	ctrl.brands = [
		{label:'Adidas', value:'Adidas'},
		{label:'asics', value:'asics'},
		{label:'Birkenstock', value:'Birkenstock'},
		{label:'Converse', value:'Converse'},
		{label:'Herschel', value:'Herschel'},
		{label:'Jansport', value:'Jansport'},
		{label:'K-Swiss', value:'K-Swiss'},
		{label:'Nike', value:'Nike'},
		{label:'All', value:''}
	];
	ctrl.brand = ctrl.brands[8];
}
ProductsCtrl.prototype.test = function() {
	var ctrl = this;
	console.log(ctrl.gender);
	ctrl.gender = {
		value:'Womens'
		}
};

ProductsCtrl.prototype.toEditProduct = function(product, productId){
	var ctrl = this;
	ctrl.$state.go('admin.editproduct',{productId:productId});
}

