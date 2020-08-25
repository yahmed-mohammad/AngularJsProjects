(function () {

    angular.module('FormValidation',[]);
    
    angular.module('FormValidation')
    .controller('RegistrationController', RegistrationController);
    
    function RegistrationController() {
      var reg = this;
    
      reg.submit = function () {
        reg.completed = true;
      };
    }
    
    })();
    