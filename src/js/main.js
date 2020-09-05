
require.config({
	baseUrl: '/',
	paths: {
		'gitjs': '/js/lib/gitjs/src/'
	},
	packages: [
		{
			//name: 'gitjs', location: 'js/lib/gitjs/src'
		}
	],
	urlArgs: '20160809'
});

require([
	'gitjs/event/event',
	'gitjs/element/element',
	'gitjs/core/model',
	'gitjs/core/compiler',
	'gitjs/git',
	'gitjs/core/htmlParser',
	'gitjs/util/util',
	'gitjs/promise/promise',
	'gitjs/ajax/ajax',
	'gitjs/ajax/interceptor',
	'gitjs/router/router',
	'gitjs/core/template'

], function(Event, $, Model, compiler, git, HtmlParser, u, Promise, Ajax, Interceptor, Router, Template){

	var
		router = new Router({
			
			'home': {

				view: 'a',
				controller: '/controller.js'
			},

			'home.book': {
				view: 'a.b',
				template: '{{test}}<span>{{test}}</span>'
			},

			'home.food': {
				view: 'a.b',
				template: 'i am food'
			}
		});

	var
		template = new Template(),
		str = document.getElementById('template').innerHTML;
	template._$template(str)()

	 /*var
        nTest = $('#test');
    console.log(nTest, nTest._$parent('.parent'))*/

	/*function add(x, y){
		return x + 
		return function(y){

		}
	}*/
	/*var
		a = $('#test .hello');
	a._$css({
		color: 'red',
		'border': '1px solid red',
		padding: '10px 0'
	})*/
	
	/*var
		a = $('body')._$append('<div style="height:30px;background:green;">hello world!</div>')._$commit();
*//*
	Promise._$promise(function(defer){
		setTimeout(function(){
			defer._$resolve(1);
		}, 1000)
		
	})._$done(function(){
		console.log('resolve', arguments);
		return Promise._$promise(function(defer){
			setTimeout(function(){
				defer._$reject(2);
			}, 1000)
			
		})

	})._$then(function(){
		console.log('resolve2')
	}, function(){
		console.log('reject2', arguments)
	})*/

	/*Interceptor._$add(new Interceptor())
	var
		ajax = new Ajax({
			method: 'post',
			url: '/',
			params: {
				a: 1,
				b: 2
			},
			headers: {
				a: 123,
				'Content-Type': 'application/json'
			}
		});
	ajax._$then(function(ret){
		console.log(ret)
	}, function(ret){
		console.log(ret)
	})*/

	/*Promise._$when(function(){

		return Promise._$promise(function(defer){
			setTimeout(function(){
				defer._$resolve(1);
			}, 1000)
			
		})

	}, function(){

		return Promise._$promise(function(defer){
			setTimeout(function(){
				defer._$reject(1);
			}, 2000)
			
		})

	})._$then(function(){
		console.log(' when is resolved');
	}, function(){
		console.log(' when is rejected');
	})*/
	
	git._$registerDirective('gthello', {
		_$model: true,

		_$compile: function(element){
			console.log('hello compile')
		},

		template: 'yjz',
		transclude: true,

		_$link: function(element, attr, model){
			console.log('hello link')
		}

	});

	git._$registerDirective('gtHello2', {
		_$priority: 100,
		_$model: true,
		_$compile: function(element){
			console.log('hello2 compile')
		},

		_$link: function(element, attr, model){
			console.log('hello2 link')
		}

	});

	git._$registerController('helloController', function(model, view){
		
		/*model.a = {
			b: 123
		};*/
		//model._$apply('test = "你好"')
		model._$set('test', '你好');

	});

	git._$bootstrap();

	var
		htmlParser = new HtmlParser(),
		vTree;
	//vTree = htmlParser._$parse('<div class= "a" >123<a><img /><span>123</span></a></  div>')

	//console.log(vTree._$index())
	
})