/*
| Talent acquisition
*/
var app = angular.module('tq_database', ['ngRoute']);

/*
| Router
*/
app.config(['$routeProvider',function($routeProvider){
	$routeProvider.
	when("/",{templateUrl:"page_1.html",controller:"tq_db_controller",controllerAs:"c1"}).
	when("/list",{templateUrl:"page_2.html",controller:"tq_db_list_controller",controllerAs:"c2"}).
	otherwise({
		redirectTo:"/"
	});
}]);
 

/*
| Directive for interview record list
*/
app.directive("interview",function(){
    var directive = {};
    directive.restrict = "E";
    directive.templateUrl =  'html_files/interview.html';
    return directive;
});

/*
| Directive for menu on the top
*/
app.directive("menu",function(){
    return {
        restrict : "E",
        templateUrl : 'html_files/menu.html'
    };
});




/*
| 1st Controller Talent Acquisition Controller (Page 1)
*/
app.controller('tq_db_controller', ['$location','$scope','IDGenerator','storage','ta_validate',function($location,$scope,IDGenerator,storage,ta_validate) {

    $scope.cities = ['','London','Brington','Belfast','Cardiff','Newcastle','Elsewhere'];
    $scope.error_on = false;
    $scope.invalid_phone = false;
    $scope.invalid_email = false;
    $scope.required_missing= false;
    $scope.current_show = false;
    /*
    | New record "submit" function 
    */
    $scope.submit_ta_records = function(){ 
        if($scope.validate($scope.form_fields)){
            if(!storage.store_ta_record($scope.form_fields)){
                $scope.form_fields.val_interview_id = IDGenerator.generateInterviewID();
            }else{
                $location.path("/list");
            }
        }else{
            $scope.error_on = true;
        }
    }

    /*
    | Param: All input models
    | Return false: if validation failed on phone or email or required field missing
    | Return true: if validation success
    | *Note: Calls "ta_validate" service to validate records
    */
    $scope.validate = function(records){
        ta_validate.checkPhone(records.val_interviewee_phone)?$scope.invalid_phone=false:$scope.invalid_phone=true;
        ta_validate.checkEmail(records.val_interviewee_email)?$scope.invalid_email=false:$scope.invalid_email=true;
        ta_validate.checkRequired(records)?$scope.required_missing = false:$scope.required_missing = true;
        return !($scope.required_missing || $scope.invalid_email || $scope.invalid_phone);
    }

    /*
    | Calls "IDGenerator" service to return a unique ID to interview record
    */
    $scope.generateID = function(){
       $scope.form_fields.val_interview_id = IDGenerator.generateInterviewID();
    }
    
    /*
    | Show_details display additional info. about the interview record
    */
    $scope.show_details = function(interview_id){
        if($scope.current_show === interview_id) $scope.current_show = false;
        else $scope.current_show = interview_id;
    }
    
}]);

/*
| 2nd Controller for Talent Acquisition Database List Page (Page 2)
*/
app.controller("tq_db_list_controller",['$scope','storage',function($scope,storage){
    $scope.show_list = function(){
        $scope.interviews = storage.retrieve_ta_records();
    }
}]);


/*
| Filter to trim down the lastname and join with the firstname if the total length exceeds 12 chars.
*/
app.filter('shorten', function () {
    return function (firstname, lastname) {
      var name = firstname+" "+lastname
      if(name.length>12){
         return firstname+" "+(lastname.substr(0,1))+".";
      }else{
          return name;
      }
    };
});