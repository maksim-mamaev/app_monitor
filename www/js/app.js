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
    myCtl.statusMonetaProd = 0;
    myCtl.statusMonetaDev = 0;

    $interval(pingWalletProdApp2, 1000);
    $interval(pingWalletDevApp2, 1000);
    $interval(pingMonetaProdApp, 1000);
    $interval(pingMonetaDevApp, 1000);

    myCtl.LoginRequest = function() {
      this.login = "";
      this.password = "";
    };

    document.addEventListener('deviceready', function () {
    });

    function pingWalletProdApp() {
      var logPrefix = "pingWalletProdApp - ";

      pingWalletApp('wallet.moneta.ru','', '')
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
      pingWalletApp('mw-dev-app1.service.local.moneta.ru','', '')
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

    function pingWalletProdApp2() {
      var logPrefix = "pingWalletProdApp2 - ";

      pingWalletApp2('wallet.moneta.ru')
        .then(function(res) {
          if(res.status === 200 && res.data.indexOf("Manage Console") > -1) {
            myCtl.statusWalletProd = 1;
          }

          console.log(logPrefix + 'OK: ' + angular.toJson(res.status));
        }, function(err) {
          console.log(logPrefix + 'ERROR: ' + angular.toJson(err));

          myCtl.statusWalletProd = 0;
        })
        .finally(function() {
          console.log(logPrefix + 'END');
        });
    }

    function pingWalletDevApp2() {
      var logPrefix = "pingWalletDevApp2 - ";
      pingWalletApp2('mw-dev-app1.service.local.moneta.ru')
        .then(function(res) {
          if(res.status === 200 && res.data.indexOf("Manage Console") > -1) {
            myCtl.statusWalletDev = 1;
          }

          console.log(logPrefix + 'OK: ' + angular.toJson(res.status));
        }, function(err) {
          console.log(logPrefix + 'ERROR: ' + angular.toJson(err));

          myCtl.statusWalletDev = 0;
        })
        .finally(function() {
          console.log(logPrefix + 'END');
        });
    }

    function pingMonetaProdApp() {
      var logPrefix = "pingMonetaProdApp - ";

      pingMonetaApp('moneta.ru')
        .then(function(res) {
          if(res.status === 200 && res.data.indexOf("login.htm") > -1) {
            myCtl.statusMonetaProd = 1;
          }

          console.log(logPrefix + 'OK: ' + angular.toJson(res.status));
        }, function(err) {
          console.log(logPrefix + 'ERROR: ' + angular.toJson(err));

          myCtl.statusMonetaProd = 0;
        })
        .finally(function() {
          console.log(logPrefix + 'END');
        });
    }

    function pingMonetaDevApp() {
      var logPrefix = "pingMonetaDevApp - ";
      pingMonetaApp('demo.moneta.ru')
        .then(function(res) {
          if(res.status === 200 && res.data.indexOf("login.htm") > -1) {
            myCtl.statusMonetaDev = 1;
          }

          console.log(logPrefix + 'OK: ' + angular.toJson(res.status));
        }, function(err) {
          console.log(logPrefix + 'ERROR: ' + angular.toJson(err));

          myCtl.statusMonetaDev = 0;
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

    function pingWalletApp2(domain) {
      var logPrefix = "pingWalletApp2 - ";
      console.log(logPrefix + 'BEGIN');

      return $http({
        method: 'GET',
        url: 'https://' + domain,
        headers: {'Content-Type': 'text/html'},
        timeout: 15 * 1000
      })
        .finally(function() {
          console.log(logPrefix + 'END');
        });
    }

    function pingMonetaApp(domain) {
      var logPrefix = "pingWalletApp - ";

      console.log(logPrefix + 'BEGIN');

      return $http({
        method: 'GET',
        url: 'https://' + domain,
        headers: {'Content-Type': 'text/html'},
        timeout: 15 * 1000

      })
        .finally(function() {
          console.log(logPrefix + 'END');
        });
    }
  });


