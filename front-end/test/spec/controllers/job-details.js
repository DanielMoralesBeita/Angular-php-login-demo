/*
'use strict';
describe('Controller: JobDetailsCtrl', function () {

    // load the controller's module
    beforeEach(module('343LandingPageApp'));

    var JobDetailsCtrl,
    scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        JobDetailsCtrl = $controller('JobDetailsCtrl', {
            $scope: scope
        });
    }));

    it('should attach the scope for the JobDetailsCtrl', function () {
        expect(scope.title).toBe('jobdetails');
    });



});
*/

'use strict';

describe('Controller: JobDetailsCtrl', function () {

    beforeEach(module('343LandingPageApp'));

    var JobDetailsCtrl, scope, root;
    var httpBackend;
    // Test network calls
    var url = 'http://neadcom.wwwss24.a2hosted.com/343TruckingAPI/api/v1/trucking/jobs/1/23454';

    beforeEach(inject(function ($controller, $rootScope, $injector, $httpBackend, $http, $routeParams) {
        scope = $rootScope.$new();
        root = $rootScope;
        httpBackend = $injector.get('$httpBackend');

        httpBackend.when('GET', url).respond('3000');

        JobDetailsCtrl = $controller('JobDetailsCtrl', {
            $scope: scope,
            $http: $http,
            $routeParams: { jobid: 1, ownerId: 23454 }
        });

    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('API call to get job details', function () {
        /*Test controller initiation*/
        it('Should be defined.', function () {
            var data = {
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
            };
            
            httpBackend.expectGET(url).respond(data);

            httpBackend.flush();
            root.$digest();
            expect(scope.trabajo).toBeDefined();
        });
    });


    it('should have JobDetailsCtrl defined', function () {
        expect(JobDetailsCtrl).toBeDefined();
    });
});
