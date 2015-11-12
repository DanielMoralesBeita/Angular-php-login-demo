'use strict';

/**
 * @ngdoc function
 * @name 343LandingPageApp.controller:ClasificadosCtrl
 * @description
 * # ClasificadosCtrl
 * Controller of the 343LandingPageApp
 */
(function(){

	angular.module('343LandingPageApp')
	  .controller('ClasificadosCtrl', function ($scope) {
	    $scope.title = 'clasificados';

	    //alert($scope.title);

	    /*testing data */

	    $scope.clasificados = [
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
		        'datePosted':'2 days ago'
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
		        'datePosted':'4 days ago'
		    },
		    {
		        'id': '3',
		        'ownerID': '23454',
		        'title': 'Se necesitand 2 Choferes, buenos beneficios!!!',
		        'description': 'Duis tristique urna eros, vel posuere quam lacinia nec. Sed non mauris eget neque blandit facilisis id non eros. Duis tristique urna eros, vel posuere quam lacinia nec. Sed non mauris eget neque blandit facilisis id non eros.',
		        'requirements': '3 years of experience',
		        'location': 'Long Beach, CA',
		        'compensation': '$70,000',
		        'benefits': 'Health Care after a year, 4 weeks paid vacation',
		        'howToApply': 'Send the application in person',
		        'datePosted':'5 days ago'
		    },
		    {
		        'id': '4',
		        'ownerID': '23454',
		        'title': 'Viaje interaste. Class A licencia',
		        'description': 'Duis tristique urna eros, vel posuere quam lacinia nec. Sed non mauris eget neque blandit facilisis id non eros. Duis tristique urna eros, vel posuere quam lacinia nec. Sed non mauris eget neque blandit facilisis id non eros. Duis tristique urna eros, vel posuere quam lacinia nec. Sed non mauris eget neque blandit facilisis id non eros.',
		        'requirements': '2 years of experience',
		        'location': 'Long Beach, CA',
		        'compensation': '$50,000',
		        'benefits': 'Health Care after a year, 4 weeks paid vacation',
		        'howToApply': 'Send the application in person',
		        'datePosted':'2 days ago'
		    },
		    {
		        'id': '5',
		        'ownerID': '23454',
		        'title': 'Need Class A Drivers with 2 years of experience',
		        'description': 'Duis tristique urna eros, vel posuere quam lacinia nec. Sed non mauris eget neque blandit facilisis id non eros.',
		        'requirements': '3 years of experience',
		        'location': 'Long Beach, CA',
		        'compensation': '$50,000',
		        'benefits': 'Health Care after a year, 4 weeks paid vacation',
		        'howToApply': 'Send the application in person',
		        'datePosted':'5 days ago'
		    },
		    {
		        'id': '6',
		        'ownerID': '23454',
		        'title': 'Excelente compania con buenos beneficios. ',
		        'description': 'Duis tristique urna eros, vel posuere quam lacinia nec. Sed non mauris eget neque blandit facilisis id non eros. Duis tristique urna eros, vel posuere quam lacinia nec. Sed non mauris eget neque blandit facilisis id non eros.',
		        'requirements': '3 years of experience',
		        'location': 'Long Beach, CA',
		        'compensation': '$50,000',
		        'benefits': 'Health Care after a year, 4 weeks paid vacation',
		        'howToApply': 'Send the application in person',
		        'datePosted':'8 days ago'
		    },
		    {
		        'id': '7',
		        'ownerID': '23454',
		        'title': 'Chofers para manejar local',
		        'description': 'Duis tristique urna eros, vel posuere quam lacinia nec. Sed non mauris eget neque blandit facilisis id non eros.',
		        'requirements': '2 years of experience',
		        'location': 'Long Beach, CA',
		        'compensation': '$50,000',
		        'benefits': 'Health Care after a year, 4 weeks paid vacation',
		        'howToApply': 'Send the application in person',
		        'datePosted':'1 days ago'
		    },
		    {
		        'id': '8',
		        'ownerID': '23454',
		        'title': 'Choferes nocturnos para manager the Los Angeles and Sacramento',
		        'description': 'The description',
		        'requirements': '3 years of experience',
		        'location': 'Long Beach, CA',
		        'compensation': '$50,000',
		        'benefits': 'Health Care after a year, 4 weeks paid vacation',
		        'howToApply': 'Send the application in person',
		        'datePosted':'1 days ago'
		    },
		    {
		        'id': '9',
		        'ownerID': '23454',
		        'title': 'Need Class A Drivers with 2 years of experience',
		        'description': 'The description',
		        'requirements': '3 years of experience',
		        'location': 'Long Beach, CA',
		        'compensation': '$50,000',
		        'benefits': 'Health Care after a year, 4 weeks paid vacation',
		        'howToApply': 'Send the application in person',
		        'datePosted':'2 days ago'
		    },
		    {
		        'id': '10',
		        'ownerID': '23454',
		        'title': 'Compania nueva necesita 5 Choferes con records limpio',
		        'description': 'The description',
		        'requirements': '3 years of experience',
		        'location': 'Long Beach, CA',
		        'compensation': '$50,000',
		        'benefits': 'Health Care after a year, 4 weeks paid vacation',
		        'howToApply': 'Send the application in person',
		        'datePosted':'1 days ago'
		    },
		    {
		        'id': '11',
		        'ownerID': '23454',
		        'title': 'Need Class A Drivers with 2 years of experience',
		        'description': 'The description',
		        'requirements': '3 years of experience',
		        'location': 'Long Beach, CA',
		        'compensation': '$50,000',
		        'benefits': 'Health Care after a year, 4 weeks paid vacation',
		        'howToApply': 'Send the application in person',
		        'datePosted':'4 days ago'
		    }
		];

	});



}());