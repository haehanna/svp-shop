app.service('adminSrv',AdminService);

function AdminService($state,api){
	this.api = api;
	this.state = $state;
	this.jumbotrons = [];
}

AdminService.prototype.getJumbotrons = function(){
	var _this = this;
	if(_this.jumbotrons.length == 0){
		return this.api.request('/adminjumbo',{},'GET')
		.then(function(res){
			// console.log(res);
			_this.jumbotrons = res.data.jumbotrons;
			return res.data.jumbotrons;
		},function(res){
			// console.log(res);
			return;
		})
	}
	else{
		return _this.jumbotrons;
	}
}

AdminService.prototype.getJumbotron = function(jumbotronId){
	var _this = this;
	return this.api.request('/adminjumbo/'+jumbotronId,{},'GET')
	.then(function(res){
		return res.data.jumbotron;
	})
}

AdminService.prototype.addJumbotron = function(jumbotron){
	var _this = this;
	this.api.request('/adminjumbo',jumbotron,'POST')
	.then(function(res){
		// console.log(res);
		if(res.status === 200){
			_this.jumbotrons.push(res.data.jumbotron);
			_this.state.go('admin.jumbotron');
		}
	})
}

AdminService.prototype.deleteJumbotron = function(jumbotronId, jumbotron){
	var _this = this;
	return this.api.request('/adminjumbo/'+jumbotronId,jumbotron,'DEL')
	.then(function(res){
		// console.log(res);
		if(res.status === 200){
			for(index in _this.jumbotrons){
				if(_this.jumbotrons[index].id == jumbotronId){
					delete _this.jumbotrons[index];
				}
			}
		}
	})
}

AdminService.prototype.updateJumbotron = function(jumbotron,jumbotronId){
	var _this = this;
	this.api.request('/adminjumbo/'+jumbotronId,jumbotron,'PUT')
	.then(function(res){
		// console.log(res);
		if(res.status === 200){
			_this.updateJumboList(jumbotron,jumbotronId);
			_this.state.go('admin.jumbotron');
		}
	})
}

AdminService.prototype.updateJumboList = function(jumbotron,jumbotronId){

	for(var index in this.jumbotrons){
		if(this.jumbotrons[index].id == jumbotronId){
			this.jumbotrons[index].title = jumbotron.title;
			this.jumbotrons[index].img = jumbotron.img;
			this.jumbotrons[index].active = jumbotron.active;
		}
	}
	// console.log(jumbotron);
	// console.log(this.jumbotrons);
}


