// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

  .controller('myController', function($scope, $interval, $http) {

    var myCtl = this;
    myCtl.statusWalletProd = 0;
    myCtl.statusWalletDev = 0;

    $interval(pingWalletProdApp, 3000);
    $interval(pingWalletDevApp, 3000);

    myCtl.LoginRequest = function() {
      this.login = "";
      this.password = "";
    };

    document.addEventListener('deviceready', function () {
    });

    function pingWalletProdApp() {
      var logPrefix = "pingWalletProdApp - ";

      pingWalletApp('','', '')
        .then(function(res) {
          myCtl.statusWalletProd = 1;

          console.log(logPrefix + 'OK: ' + angular.toJson(res));
        }, function(err) {
          console.log(logPrefix + 'ERROR: ' + angular.toJson(err));

          myCtl.statusWalletProd = 0;
        })
        .finally(function() {
          console.log(logPrefix + 'END');
        });
    }

    function pingWalletDevApp() {
      var logPrefix = "pingWalletDevApp - ";
      pingWalletApp('','', '')
        .then(function(res) {
          myCtl.statusWalletDev = 1;

          console.log(logPrefix + 'OK: ' + angular.toJson(res));
        }, function(err) {
          console.log(logPrefix + 'ERROR: ' + angular.toJson(err));

          myCtl.statusWalletDev = 0;
        })
        .finally(function() {
          console.log(logPrefix + 'END');
        });
    }

    function pingWalletApp(domain, login, pwd) {
      var logPrefix = "pingWalletApp - ",
        reqObj = new myCtl.LoginRequest();

      console.log(logPrefix + 'BEGIN');

      reqObj.login = login;
      reqObj.password = pwd;

      return $http({
        method: 'POST',
        url: 'https://' + domain + '/json/authentication/login',
        headers: {'Content-Type': 'application/json'},
        data: reqObj,
        withCredentials: true,
        timeout: 15 * 1000

      })
      .finally(function() {
        console.log(logPrefix + 'END');
      });
    }
  });


