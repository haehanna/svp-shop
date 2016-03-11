'use strict';

var app = angular.module('svpApp',[
	'ui.router',
	'ui.bootstrap',
	]);

app.config(function($stateProvider,$httpProvider,$urlRouterProvider){

	$urlRouterProvider.otherwise('main');

	$stateProvider
	.state('main',{
		url:'/',
		templateUrl: 'site/partials/main-nav.html',
		controller: 'ProductsCtrl as ctrl',
		resolve:{
			products: function(productSrv){
				return productSrv.getProducts();
			},
			jumbotrons: function(jumbotronSrv){
				return jumbotronSrv.getJumbotrons();
			}
		}
	})

	.state('main.page',{
		url:'main',
		templateUrl: 'site/partials/main-page.html',
		controller: 'ProductsCtrl as ctrl',
		resolve:{
			products: function(productSrv){
				return productSrv.getProducts();
			},
			jumbotrons: function(jumbotronSrv){
				return jumbotronSrv.getJumbotrons();
			}
		}
	})

	.state('main.products',{
		url:'products',
		templateUrl: 'site/partials/main-products.html',
		controller: 'ProductsCtrl as ctrl',
		resolve:{
			products: function(productSrv){
				return productSrv.getProducts();
			},
			jumbotrons: function(jumbotronSrv){
				return jumbotronSrv.getJumbotrons();
			}
		}
	})

	.state('main.about',{
		url:'about',
		templateUrl:'site/partials/main-about.html'
	})

	.state('main.locations',{
		url:'locations',
		templateUrl:'site/partials/main-locations.html'
	})

	.state('main.careers',{
		url:'careers',
		templateUrl:'site/partials/main-careers.html'
	})

	.state('main.return',{
		url:'return',
		templateUrl:'site/partials/main-return.html'
	})

	.state('main.contact',{
		url:'contact',
		templateUrl:'site/partials/main-contact.html'
	})

	.state('login',{
		url:'/login',
		templateUrl: 'site/partials/admin-login.html'
	})

	.state('admin',{
		url:'/adminnav',
		templateUrl: 'site/partials/admin-nav.html',
		controller:'NavCtrl as ctrl'
	})

	.state('admin.page',{
		url:'/admin',
		templateUrl:'site/partials/admin-page.html'
	})

	.state('admin.products',{
		url:'/allproducts',
		templateUrl: 'site/partials/admin-products.html',
		controller: 'ProductsCtrl as ctrl',
		resolve: {
			products: function(productSrv){
				return productSrv.getProducts();
			},
			jumbotrons: function(jumbotronSrv){
				return jumbotronSrv.getJumbotrons();
			}
		}
	})

	.state('admin.addproduct',{
		url:'/addproduct',
		templateUrl: 'site/partials/admin-addproducts.html',
		controller: 'ProductCtrl as ctrl',
		resolve:{
			product: function(productSrv){
				return {};
			}
		}
	})

	.state('admin.editproduct',{
		url:'/product/:productId',
		templateUrl:'site/partials/admin-editproducts.html',
		controller: 'ProductCtrl as ctrl',
		resolve:{
			product: function(productSrv,$stateParams){
				return productSrv.getProduct($stateParams.productId);
			}
		}
	})

	.state('admin.jumbotron',{
		url:'/jumbotron',
		templateUrl:'site/partials/admin-jumbotron.html',
		controller: 'JumbosCtrl as ctrl',
		resolve:{
			jumbotrons: function(jumbotronSrv){
				return jumbotronSrv.getJumbotrons();
			},
			jumbotrons: function(jumbotronSrv){
				return jumbotronSrv.getJumbotrons();
			}
		}
	})

	.state('admin.addjumbotron',{
		url:'/addjumbotron',
		templateUrl:'site/partials/admin-addjumbotron.html',
		controller: 'JumboCtrl as ctrl',
		resolve:{
			jumbotron: function(jumbotronSrv){
				return jumbotronSrv.getJumbotrons();
			}
		}
	})

	.state('admin.editjumbotron',{
		url:'/editjumbotron/:jumbotronId',
		templateUrl:'site/partials/admin-editjumbotron.html',
		controller: 'JumboCtrl as ctrl',
		resolve:{
			jumbotron: function(jumbotronSrv,$stateParams){
				return jumbotronSrv.getJumbotron($stateParams.jumbotronId);
			}
		}
	})

	
})