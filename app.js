angular.module('instangular', ['ngRoute'])

	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider
		.when('/', {
			templateUrl: 'templates/search.html',
			controller: 'MainCtrl'
		})

		.when('/favorites', {
			templateUrl: 'templates/favorites.html',
			controller: 'FavoritesCtrl'
		})

		$locationProvider.html5Mode( {
			enabled: true,
			requireBase: false
		});
	}])

	.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
		$scope.photos = [];

		$scope.searchTag = function () {
			var tag = $scope.tag.replace(/\s+/, '');
			var url = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?client_id=d8d0d6b44249490bbde6eee4d1968dac&callback=JSON_CALLBACK';
				$http.jsonp(url)
				.then (function (response) {
					$scope.tag = '';
					$scope.photos = response.data.data;
				});
		};

		$scope.savePhoto = function(photo) {
			//check if localStorage.photos doesn't exist yet
			if(!localStorage.photos) {
				localStorage.photos = JSON.stringify([]);
			}
			//stringify our photo object and push into localStorage.photos
			var allPhotos = JSON.parse(localStorage.photos);
			allPhotos.push(photo);

			localStorage.photos = JSON.stringify(allPhotos);
		};

	}])

	.controller('FavoritesCtrl', ['$scope', function ($scope) {
		$scope.favorites = JSON.parse(localStorage.photos);
	}])

	//localStorage.clear() in browser console to clear localStorage

	;








