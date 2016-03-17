app.controller('JumbosCtrl',JumbosCtrl);

function JumbosCtrl(adminSrv,$state,api,jumbotrons){
	var ctrl = this;
	ctrl.adminSrv = adminSrv;
	ctrl.$state = $state;
	ctrl.jumbotrons = jumbotrons;
}


JumbosCtrl.prototype.toJumbotron = function(jumbotron, jumbotronId){
	var ctrl = this;
	ctrl.$state.go('admin.editjumbotron',{jumbotronId:jumbotronId});
}