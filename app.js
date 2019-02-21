
var express = require('express');
var merchantApp = express();
var phoenixApp = express();
var treeDsServerApp = express();
var ACSApp = express();
var morganBody = require('morgan-body');

const define3dsServerGateway = require('./3ds-server-gateway');
const define3dsServer = require('./3ds-server');
const defineMerchantWebSite = require('./merchant-website-server');
const defineACSServer = require('./acs-server');

defineMerchantWebSite(merchantApp);
define3dsServerGateway(phoenixApp);
define3dsServer(treeDsServerApp);
defineACSServer(ACSApp);

merchantApp.listen(3000, function () {
    console.log('started merchant-website app listening on port 3000!');
    phoenixApp.listen(3001,function (){
        console.log('started phoenix app listening on port 3001!')
        treeDsServerApp.listen(3002,function (){
            console.log('started 3DS-server app listening on port 3002!')
            ACSApp.listen(3003,function (){
                console.log('started ACS app listening on port 3003!')
            })
        })
    })
});