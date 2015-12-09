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

  .controller('myController', function($scope, $interval, $http, $q) {

    var myCtl = this;
    myCtl.statusWalletProd = 0;
    myCtl.statusWalletDev = 0;
    myCtl.statusWalletDemo = 0;

    myCtl.statusMonetaProd = 0;
    myCtl.statusMonetaDev = 0;

    myCtl.statusMonetaPayProd = 0;
    myCtl.statusMonetaPayDev = 0;
    myCtl.statusMonetaPayDemo = 0;

    $interval(pingWalletProdApp2, 3000);
    $interval(pingWalletDemoApp, 3000);
    $interval(pingWalletDevApp2, 3000);

    $interval(pingMonetaProdApp, 60000);
    $interval(pingMonetaDevApp, 60000);

    $interval(pingMonetaPayProdApp, 3000);
    $interval(pingMonetaPayDevApp, 3000);
    $interval(pingMonetaPayDemoApp, 3000);

    //$interval(
    //  function() {
    //    $q.all([
    //      pingMonetaDevApp().then(function (res) {
    //        myCtl.statusMonetaDev = res;
    //      }),
    //      pingMonetaProdApp().then(function (res) {
    //        myCtl.statusMonetaProd = res;
    //        console.log(res);
    //      })
    //
    //    ])
    //  }, 1000
    //);

    myCtl.LoginRequest = function() {
      this.login = "";
      this.password = "";
    };

    document.addEventListener('deviceready', function () {
    });

    //function pingWalletProdApp() {
    //  var logPrefix = "pingWalletProdApp - ";
    //
    //  pingWalletApp('wallet.moneta.ru','', '')
    //    .then(function(res) {
    //      myCtl.statusWalletProd = 1;
    //
    //      console.log(logPrefix + 'OK: ' + angular.toJson(res));
    //    }, function(err) {
    //      console.log(logPrefix + 'ERROR: ' + angular.toJson(err));
    //
    //      myCtl.statusWalletProd = 0;
    //    })
    //    .finally(function() {
    //      console.log(logPrefix + 'END');
    //    });
    //}
    //
    //function pingWalletDevApp() {
    //  var logPrefix = "pingWalletDevApp - ";
    //  pingWalletApp('mw-dev-app1.service.local.moneta.ru','', '')
    //    .then(function(res) {
    //      myCtl.statusWalletDev = 1;
    //
    //      console.log(logPrefix + 'OK: ' + angular.toJson(res));
    //    }, function(err) {
    //      console.log(logPrefix + 'ERROR: ' + angular.toJson(err));
    //
    //      myCtl.statusWalletDev = 0;
    //    })
    //    .finally(function() {
    //      console.log(logPrefix + 'END');
    //    });
    //}

    function pingWalletProdApp2() {
      var logPrefix = "pingWalletProdApp2 - ";

      pingMonetaApp('wallet.moneta.ru/welcome.htm')
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

    function pingWalletDemoApp() {
      var logPrefix = "pingWalletDemoApp - ";

      pingMonetaApp('demo.wallet.moneta.ru/welcome.htm')
        .then(function(res) {
          if(res.status === 200 && res.data.indexOf("Manage Console") > -1) {
            myCtl.statusWalletDemo = 1;
          }

          console.log(logPrefix + 'OK: ' + angular.toJson(res.status));
        }, function(err) {
          console.log(logPrefix + 'ERROR: ' + angular.toJson(err));

          myCtl.statusWalletDemo = 0;
        })
        .finally(function() {
          console.log(logPrefix + 'END');
        });
    }

    function pingWalletDevApp2() {
      var logPrefix = "pingWalletDevApp2 - ";
      pingMonetaApp('mw-dev-app1.service.local.moneta.ru/welcome.htm')
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
      var logPrefix = "pingMonetaProdApp - ",
        result = 0;

      return pingMonetaApp('moneta.ru/ping.htm')
        .then(function(res) {
          if(res.status === 200 && res.data.indexOf("PONG") > -1) {
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
      var logPrefix = "pingMonetaDevApp - ",
        result = 0;

      return pingMonetaApp('demo.moneta.ru/ping.htm')
        .then(function(res) {
          if(res.status === 200 && res.data.indexOf("PONG") > -1) {
            myCtl.statusMonetaDev = 1;
          }

          console.log(logPrefix + 'OK: ' + angular.toJson(res.status));
        }, function(err) {
          console.log(logPrefix + 'ERROR: ' + angular.toJson(err));

          myCtl.statusMonetaDev = 0;
        })
        .finally(function() {
          console.log(logPrefix + 'END. Result = ' + result);
          return result;
        });
    }

    function pingMonetaPayProdApp() {
      var logPrefix = "pingMonetaPayProdApp - ",
        result = 0;

      return pingMonetaApp('pay.moneta.ru/welcome.htm')
        .then(function(res) {
          if(res.status === 200 && res.data.indexOf("Manage Console") > -1) {
            myCtl.statusMonetaPayProd = 1;
          }

          console.log(logPrefix + 'OK: ' + angular.toJson(res.status));
        }, function(err) {
          console.log(logPrefix + 'ERROR: ' + angular.toJson(err));

          myCtl.statusMonetaPayProd = 0;
        })
        .finally(function() {
          console.log(logPrefix + 'END');
        });
    }

    function pingMonetaPayDevApp() {
      var logPrefix = "pingMonetaPayDevApp - ",
        result = 0;

      return pingMonetaApp('mpay-dev-app1.service.local.moneta.ru/welcome.htm')
        .then(function(res) {
          if(res.status === 200 && res.data.indexOf("Manage Console") > -1) {
            myCtl.statusMonetaPayDev = 1;
          }

          console.log(logPrefix + 'OK: ' + angular.toJson(res.status));
        }, function(err) {
          console.log(logPrefix + 'ERROR: ' + angular.toJson(err));

          myCtl.statusMonetaPayDev = 0;
        })
        .finally(function() {
          console.log(logPrefix + 'END. Result = ' + result);
          return result;
        });
    }

    function pingMonetaPayDemoApp() {
      var logPrefix = "pingMonetaPayDemoApp - ",
        result = 0;

      return pingMonetaApp('demo.pay.moneta.ru/welcome.htm')
        .then(function(res) {
          if(res.status === 200 && res.data.indexOf("Manage Console") > -1) {
            myCtl.statusMonetaPayDemo = 1;
          }

          console.log(logPrefix + 'OK: ' + angular.toJson(res.status));
        }, function(err) {
          console.log(logPrefix + 'ERROR: ' + angular.toJson(err));

          myCtl.statusMonetaPayDemo = 0;
        })
        .finally(function() {
          console.log(logPrefix + 'END. Result = ' + result);
          return result;
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


