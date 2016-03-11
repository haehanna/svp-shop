app.controller('JumboCtrl',JumboCtrl);

function JumboCtrl(jumbotronSrv,$state,api,jumbotron){
	var ctrl = this;
	ctrl.jumbotronSrv = jumbotronSrv;
	ctrl.$state = $state;
	ctrl.jumbotron = jumbotron;
}

JumboCtrl.prototype.addJumbotron = function(){
	var ctrl = this;
	var jumbotron = {
		title: ctrl.title,
		img: ctrl.img
	};
	ctrl.jumbotronSrv.addJumbotron(jumbotron);
	ctrl.$state.go('admin.jumbotron')
}

JumboCtrl.prototype.deleteJumbotron = function(){
	var ctrl = this;

	ctrl.jumbotronSrv.deleteJumbotron(ctrl.jumbotron.id,ctrl.jumbotron)
	.then(function(res){
		ctrl.$state.go('admin.jumbotron')
	})
}

JumboCtrl.prototype.updateJumbotron = function(){
	var ctrl = this;

	ctrl.jumbotronSrv.updateJumbotron(ctrl.jumbotron, ctrl.jumbotron.id)
}