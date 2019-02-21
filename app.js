var express = require('express');
var merchantApp = express();
var phoenixApp = express();
var threeDsServerApp = express();
var ACSApp = express();

const definePhoenix = require('./apps/phoenix-server');
const define3dsServer = require('./apps/3ds-server');
const defineMerchantWebSite = require('./apps/merchant-website-server');
const defineACSServer = require('./apps/acs-server');

defineMerchantWebSite(merchantApp);
definePhoenix(phoenixApp);
define3dsServer(threeDsServerApp);
defineACSServer(ACSApp);

merchantApp.listen(3000, function () {
    console.log('started merchant-website app listening on port 3000!');
    phoenixApp.listen(3001,function (){
        console.log('started phoenix app listening on port 3001!');
        threeDsServerApp.listen(3002,function (){
            console.log('started 3DS-server app listening on port 3002!');
            ACSApp.listen(3003,function (){
                console.log('started ACS app listening on port 3003!');
                console.log('');
                console.log('for start spike open browser at http://localhost:3000')
            })
        })
    })
});