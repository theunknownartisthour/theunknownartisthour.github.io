var store = new Lawnchair();
var app = angular.module('BlazeCMS',[]);
/*	$http.get("http://www.w3schools.com/website/Customers_JSON.php")
    .success(function(response) {$scope.names = response;});*/
app.controller('dataController',function($scope){
	$scope.input;
	$scope.key;
	$scope.name;
	$scope.data;
	$scope.keys;
	$scope.clear = function(){
		$scope.input = $scope.defaults;
	};
	$scope.loaded = false;
	$scope.save = function() {
		store.save({key: $scope.key,value: $scope.input},'console.log(record)');
		$scope.reload();
	}
	$scope.edit = function(keyid,newval){
		store.save({key: keyid, value: newval});
		$scope.reload();
	}
	$scope.remove = function(key) {
		store.remove(key,'console.log');
		$scope.reload();
	}
	$scope.getValue = function(key) {
		store.get(key,'console.log(record)');
	}
	$scope.exists = function(key){
		return store.exists(key,'console.log(record)');
	}
	$scope.batch = function(){
		store.batch($scope.input,'console.log(record)');
	}
	$scope.setdefaults = function(){
		if($scope.defaultsloaded){
			
		} else {
			$scope.defaults = $scope.input;
			$scope.defaultsloaded = true;
		}
	}
	$scope.send = function(){
		$scope.save();
		$scope.clear();
	}
	$scope.setDataArray = function(array){
		$scope.data = array;
	}
	$scope.setDataKeys = function(keys){
		$scope.keys = keys;
	}
	$scope.load = function(){
		store.all($scope.setDataArray);
		store.keys($scope.setDataKeys);
		//console.log(store);
		$scope.name = store.name;
		//console.log($scope.name);
		$scope.record = store.record;
		//console.log($scope.record);
		$scope.loaded = true;
	}
	$scope.reload = function(){
		store.all($scope.setDataArray);
		store.keys($scope.setDataKeys);
		$scope.loaded = true;
	}
	$scope.nuke = function(){
		store.nuke();
		$scope.reload();
	};
	$scope.load();
	$scope.setdefaults();
});

app.directive('inputField', function(){
	return{
		restrict: 'E',
		scope: {
			fieldVal: '@'
		},
		template: '<textarea class="form-control" type="text" data-ng-model="input.fieldVal"></textarea>'
	};
});

app.filter('to_trusted', ['$sce', function($sce){
	return function(text) {
		return $sce.trustAsHtml(text);
	};
}]);

app.directive('markdown', function () {
    var converter = new Showdown.converter();
    return {
        restrict: 'A',
		link: function (scope, element, attrs) {
		  function renderMarkdown() {
			  var htmlText = converter.makeHtml(scope.$eval(attrs.markdown)  || '');
			  element.html(htmlText);
		  }
		  scope.$watch(attrs.markdown, renderMarkdown);
		  renderMarkdown();
		}
    };

});
