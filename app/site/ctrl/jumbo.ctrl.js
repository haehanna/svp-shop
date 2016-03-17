app.controller('JumboCtrl',JumboCtrl);

function JumboCtrl(adminSrv,$state,api,jumbotron){
	var ctrl = this;
	ctrl.adminSrv = adminSrv;
	ctrl.$state = $state;
	ctrl.jumbotron = jumbotron;
}

JumboCtrl.prototype.addJumbotron = function(){
	var ctrl = this;
	var jumbotron = {
		title: ctrl.title,
		img: ctrl.img
	};
	ctrl.adminSrv.addJumbotron(jumbotron);
	ctrl.$state.go('admin.jumbotron')
}

JumboCtrl.prototype.deleteJumbotron = function(){
	var ctrl = this;

	ctrl.adminSrv.deleteJumbotron(ctrl.jumbotron.id,ctrl.jumbotron)
	.then(function(res){
		ctrl.$state.go('admin.jumbotron')
	})
}

JumboCtrl.prototype.updateJumbotron = function(){
	var ctrl = this;

	ctrl.adminSrv.updateJumbotron(ctrl.jumbotron, ctrl.jumbotron.id)
}