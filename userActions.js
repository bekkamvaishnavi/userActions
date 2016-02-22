'use strict';

angular.module('vkApp')
.directive('adduser', function() {
 	return {
		restrict: 'C',
		transclude: true,
		controller:showUsersModal,
 		scope: { },
		template: '<button ng-click="addNewUserPopUp();" class="btn btn-primary ng-binding">Add User</button> '+
	    	'<button ng-click="editUser();" class="btn btn-primary ng-binding">Edit User</button> '+
	    	'<button ng-click="deleteUser();" class="btn btn-primary ng-binding">Delete User</button>'
	};

	function showUsersModal($scope, createDialog) {
		$scope.addNewUserPopUp = function() {
			createDialog('/VKWebApp/partials/useractions.html',{ 
				id : 'arDialog', 
				title: 'Add User',
				backdrop: true, 
				controller: 'addNewUser',
			}); 
		};

	};

}).controller('addNewUser', function ($scope,AddNewUser){
	$scope.isCollapsedAR =true;
 	$scope.createNewUser = function(newuser){
		newuser.tenantId = '3';
		newuser.active =  true;
		newuser.userId =  'viswa';
		newuser.accessLevel= null;
    	newuser.editHistory= false;
		AddNewUser.create(newuser, function (json) {
			var output = json.response.status;	
			if (output == "Success") {
				$scope.data = json.response.result;
				$scope.reset(newuser);
  			}
		});
	}
	$scope.reset = function(newuser){
		newuser.first='';
		newuser.last ='';
		newuser.middle ='';
		newuser.email ='';
	}
});