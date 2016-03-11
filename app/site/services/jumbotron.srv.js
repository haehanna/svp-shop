app.service('jumbotronSrv',JumbotronService);

function JumbotronService($state,api){
	this.api = api;
	this.state = $state;
	this.jumbotrons = [];
}

JumbotronService.prototype.getJumbotrons = function(){
	var _this = this;
	return this.api.request('/jumbotrons',{},'GET')
	.then(function(res){
		console.log(res);
		_this.jumbotrons = res.data.jumbotrons;
		return res.data.jumbotrons;
	},function(res){
		console.log(res);
		return;
	})
}

JumbotronService.prototype.getJumbotron = function(jumbotronId){
	var _this = this;
	return this.api.request('/jumbotrons/'+jumbotronId,{},'GET')
	.then(function(res){
		return res.data.jumbotron;
	})
}

JumbotronService.prototype.addJumbotron = function(jumbotron){
	var _this = this;
	this.api.request('/jumbotrons',jumbotron,'POST')
	.then(function(res){
		console.log(res);
		if(res.status === 200){
			_this.jumbotrons.push(res.data.jumbotron);
			_this.state.go('admin.jumbotron');
		}
	})
}

JumbotronService.prototype.deleteJumbotron = function(jumbotronId, jumbotron){
	var _this = this;
	return this.api.request('/jumbotrons/'+jumbotronId,jumbotron,'DEL')
	.then(function(res){
		console.log(res);
		if(res.status === 200){
			for(index in _this.jumbotrons){
				if(_this.jumbotrons[index].id == jumbotronId){
					delete _this.jumbotrons[index];
				}
			}
		}
	})
}

JumbotronService.prototype.updateJumbotron = function(jumbotron,jumbotronId){
	var _this = this;
	this.api.request('/jumbotrons/'+jumbotronId,jumbotron,'PUT')
	.then(function(res){
		console.log(res);
		if(res.status === 200){
			_this.updateJumboList(jumbotron,jumbotronId);
			_this.state.go('admin.jumbotron');
		}
	})
}

JumbotronService.prototype.updateJumboList = function(jumbotron,jumbotronId){
	for(index in this.jumbotrons){
		if(this.jumbotrons[index].id == jumbotronId){
			this.jumbotron[index].title == jumbotron.title;
			this.jumbotron[index].img == jumbotron.img;
			this.jumbotron[index].active == jumbotron.active;
		}
	}
}


