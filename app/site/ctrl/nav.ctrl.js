app.controller('NavCtrl',NavCtrl);

function NavCtrl($scope){
	var ctrl = this;
	ctrl.$scope = $scope;

	$scope.show=false;
}

