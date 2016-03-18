app.controller('JumboCtrl',JumboCtrl);

function JumboCtrl(Upload,adminSrv,$state,api,jumbotron){
	var ctrl = this;
	ctrl.adminSrv = adminSrv;
	ctrl.$state = $state;
	ctrl.jumbotron = jumbotron;
	ctrl.active = ctrl.jumbotron.active;
	ctrl.Upload = Upload;

	if (ctrl.active) {
		ctrl.activeBtn = 'Click to unfeature';
	} else {
		ctrl.activeBtn = 'Click to feature';
	}
}

JumboCtrl.prototype.addJumbotron = function(){
	var ctrl = this;
	var jumbotron = {
		title: ctrl.title,
		img: ctrl.imgname,
		active: ctrl.active
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
	console.log(ctrl.jumbotron);
	ctrl.adminSrv.updateJumbotron(ctrl.jumbotron, ctrl.jumbotron.id)
}

JumboCtrl.prototype.uploadImg = function(file){
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

JumboCtrl.prototype.toggleActivate = function(){
	var ctrl = this;
	if (ctrl.jumbotron) {
		ctrl.jumbotron.active = !ctrl.jumbotron.active;
		ctrl.active = ctrl.jumbotron.active;
	}

	if (ctrl.active) {
		ctrl.activeBtn = 'Click to unfeature';
	} else {
		ctrl.activeBtn = 'Click to feature';
	}

}
