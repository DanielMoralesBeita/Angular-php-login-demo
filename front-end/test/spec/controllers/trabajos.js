'use strict';

describe('Controller: TrabajosCtrl', function () {

    beforeEach(module('343LandingPageApp'));

    var TrabajosCtrl, scope, root;
    var httpBackend;
    // Test network calls
    var url = 'http://neadcom.wwwss24.a2hosted.com/343TruckingAPI/api/v1/trucking/jobs';

    beforeEach(inject(function ($controller, $rootScope, $injector, $httpBackend, $http) {
        scope = $rootScope.$new();
        root = $rootScope;
        httpBackend = $injector.get('$httpBackend');
        httpBackend.when('GET', url).respond('3000');

        TrabajosCtrl = $controller('TrabajosCtrl', {
            $scope: scope,
            $http: $http
        });

    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });


    describe('API call to get a list of jobs', function () {
        it('Should have 2 items.', function () {

            var data = [
		    {
		        'id': '1',
		        'ownerID': '23454',
		        'title': 'Need Class A Drivers with 2 years of experience',
		        'description': 'Duis tristique urna eros, vel posuere quam lacinia nec. Sed non mauris eget neque blandit facilisis id non eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed sem purus, consequat in pharetra quis, imperdiet et nisi. Morbi rhoncus magna sed mi congue rutrum.',
		        'requirements': '3 years of experience',
		        'location': 'Long Beach, CA',
		        'compensation': '$50,000',
		        'benefits': 'Health Care after a year, 4 weeks paid vacation',
		        'howToApply': 'Send the application in person',
		        'datePosted': '2 days ago'
		    },
		    {
		        'id': '2',
		        'ownerID': '23454',
		        'title': 'Choferes con 4 anos de experiencia',
		        'description': 'Duis tristique urna eros, vel posuere quam lacinia nec. Sed non mauris eget neque blandit facilisis id non eros.',
		        'requirements': '4 years of experience',
		        'location': 'Long Beach, CA',
		        'compensation': '$50,000',
		        'benefits': 'Health Care after a year, 4 weeks paid vacation',
		        'howToApply': 'Send the application in person',
		        'datePosted': '4 days ago'
		    }];

            httpBackend
            .expectGET('http://neadcom.wwwss24.a2hosted.com/343TruckingAPI/api/v1/trucking/jobs')
            .respond(data);

            httpBackend.flush();
            root.$digest();
            expect(scope.clasificados.length).toBe(2);
        });
    });


    it('should have TrabajosCtrl defined', function () {
        expect(TrabajosCtrl).toBeDefined();
    });
});
