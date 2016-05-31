'use strict'
describe('trombiJsonCtrl',function(){
	var $httpBackend, $rootScope, createController, authRequestHandler, testTaille1, 
		testDoublonTaille1,testDoublonTaille2, testFonctionsCollapse;

	beforeEach(module('plateauAppApp'));

	beforeEach(inject(function($injector){
		$httpBackend = $injector.get('$httpBackend');
		$httpBackend.whenGET('common/main.html').respond(200, '');
		$httpBackend.whenGET('common/header_index.html').respond(200, '');
		$httpBackend.whenGET('common/footer_index.html').respond(200, '');
		authRequestHandler = $httpBackend.when('GET','../../data/trombinoscope.json').respond({});
		testTaille1 = {
				"collaborateurs" : [
					{	
						"fonction" : {
							"codeFonction":"DPs",
							"libFonction" : "Directeur de projets"
						}
					}
				]
			};
		testDoublonTaille1 = 
		{
			"collaborateurs" : [
				{	
					"fonction" : {
						"codeFonction":"DPs",
						"libFonction" : "Directeur de projets"
					}
				},
				{
					"fonction" : {
						"codeFonction":"DPs",
						"libFonction" : "Directeur de projets"
					}
				}
			]
		};
		testDoublonTaille2 = {
			"collaborateurs" : [
				{	
					"fonction" : {
						"codeFonction":"DPs",
						"libFonction" : "Directeur de projets"
					}
				},
				{
					"fonction" : {
						"codeFonction":"PMO",
						"libFonction" : "Project Management Office"
					}
				}
			]
		};
		testFonctionsCollapse = {
			"collaborateurs" : [
				{	
					"fonction" : {
						"codeFonction":"DPs",
						"libFonction" : "Directeur de projets"
					}
				},
				{
					"fonction" : {
						"codeFonction":"PMO",
						"libFonction" : "Project Management Office"
					}
				}
			]
		};
		$rootScope = $injector.get('$rootScope');
		
		var $controller = $injector.get('$controller');
		
		createController = function(){
			return $controller('trombiJsonCtrl', {
				$scope: $rootScope
			});
		};	
	}));
	
	afterEach(function(){
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});
  
	it('should set length in count variable',function(){
	 	authRequestHandler.respond(testTaille1);
		createController();	
		$httpBackend.flush();
		expect($rootScope.count).toBe(1);
	});

	it('should clean duplicate in table fonctionsAAfficher', function(){
		authRequestHandler.respond(testDoublonTaille1);
		createController();	
		$httpBackend.flush();
		expect($rootScope.fonctionsAAfficher.length).toBe(1);
	});
	it('should set variable in table fonctionsAAfficher', function(){
		authRequestHandler.respond(testDoublonTaille2);
		createController();	
		$httpBackend.flush();
		expect($rootScope.fonctionsAAfficher.length).toBe(2);
	});
	it('should set false in fonctionsAAfficher when openCollapse is called',function(){
		authRequestHandler.respond(testFonctionsCollapse);
		createController();
		$httpBackend.flush();
		$rootScope.openCollapse();
		for(var i=0; i<$rootScope.fonctionsAAfficher.length; i++){
			expect($rootScope.fonctionsAAfficher[i].isCollapsed).toBe(false);
		}
	});
	it('should set true in fonctionsAAfficher when closeCollapse is called',function(){
		authRequestHandler.respond(testFonctionsCollapse);
		createController();
		$httpBackend.flush();
		$rootScope.closeCollapse();
		for(var i=0; i<$rootScope.fonctionsAAfficher.length; i++){
			expect($rootScope.fonctionsAAfficher[i].isCollapsed).toBe(true);
		}
	});
});