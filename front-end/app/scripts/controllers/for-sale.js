'use strict';

/**
 * @ngdoc function
 * @name 343LandingPageApp.controller:ForSaleCtrl
 * @description
 * # ForSaleCtrl
 * Controller of the 343LandingPageApp
 */
 (function(){

	angular.module('343LandingPageApp')
	  .controller('ForSaleCtrl', function ($scope) {
	    $scope.title = 'for-sale';

	    $scope.forsale = [
		    {
		    	'id':'1',
		    	'title':'2010 Freighliner Low miles **',
		    	'description':'Excellent truck with low miles. Call me now for it. You won\'t be disapointe',
		    	'imgUrl':'http://media.sandhills.com/img.axd?id=2001147174&wid=0&p=&ext=&w=120&h=90&t=&lp=TRK&c=True&wt=False&sz=Max&checksum=D1bCOd583MfPOam31tzT6l675jyTNTQhAOyrO61%2fLD1fGghYIVyfP1ROxsyFgQXoUTNwh%2b7qA%2b%2ffzdQFtb%2fdcA3TG%2bvGBa1aeKUc%2fLLqqHWCa7%2bpiTjaBA%3d%3d',
		    	'type':'truck'
		    	
		    },
		     {
		    	'id':'2',
		    	'title':'2012 Peterbuild Ready to sale now',
		    	'description':'Excellent truck with low miles. Call me now for it. You won\'t be disapointe',
		    	'imgUrl':'http://media.sandhills.com/img.axd?id=2001147174&wid=0&p=&ext=&w=120&h=90&t=&lp=TRK&c=True&wt=False&sz=Max&checksum=D1bCOd583MfPOam31tzT6l675jyTNTQhAOyrO61%2fLD1fGghYIVyfP1ROxsyFgQXoUTNwh%2b7qA%2b%2ffzdQFtb%2fdcA3TG%2bvGBa1aeKUc%2fLLqqHWCa7%2bpiTjaBA%3d%3d',
		    	'type':'truck'
		    }

	    ];
	});

 }());