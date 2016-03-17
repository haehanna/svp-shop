(function(){
	'use-strict';

	angular
		.module('svpApp')
		.controller('AuthCtrl',AuthCtrl);

	AuthCtrl.$inject = ['$http', '$state'];

	function AuthCtrl($http, $state){
		var authVm = this;
		//buttons
		authVm.register_btn = 'Sign Up';
		authVm.auth_btn = "Log In";

		//Functions
		authVm.register = register;
		authVm.authenticate = authenticate;
	

		function register(){
			//check passwords
			if(authVm.password == authVm.repassword){
				var user = {
					email:authVm.email,
					password:authVm.password
				}
				user = JSON.stringify(user);
				$http.post('/api/auth/register',user)
				.then(function(res){
					console.log(res);
					authVm.register_btn = res.data.msg;
				})
			}
			else{
				authVm.register_btn = "Passwords Don't Match";
			}
		}

		function authenticate(){
			var user = {
				email:authVm.email,
				password:authVm.password
			}


			user = JSON.stringify(user);
			$http.post('/api/auth/authenticate',user)
			.then(function(res){
				console.log(res);
				localStorage.loginEmail = authVm.email;
				authVm.auth_btn = res.data.msg;
				if (res.data.user){
					$state.go('admin.products')
				}

				})
			}
		}
	}
)();