const path = require('path');
const express = require('express');
const morganBody = require('morgan-body');
const urlSettings = require('../settings.json');

function define3dsServer(treeDsServerApp) {
    //--------------- 3DS-Server --------------------------------------//

    settings(treeDsServerApp);
    let checkOtpResponse = null;
    treeDsServerApp.post('/3ds-server/api/init', function (req, res) {

        setTimeout(sendStatus, 3000);

        function sendStatus() {
            res.json({
                gdiURL: urlSettings.gdiURL //'http://localhost:3002/3ds-server/frame'
            });
        }
    });

    treeDsServerApp.post('/3ds-server/api/auth', function (req, res) {
        setTimeout(sendStatus, 3000);

        function sendStatus() {
            res.json({
                tranStatus: 'CHALLENGE',
                authURL: urlSettings.authURL //'http://localhost:3003/acs/auth'
            });
        }
    });

    treeDsServerApp.get('/3ds-server/api/verify', function (req, res) {
        res.json({ status: checkOtpResponse });
    });

    //---- 3DS-Server -- hidden service ------------//
    treeDsServerApp.get('/3ds-server/frame', function (req, res) {
        res.render('3ds-server/frame', {
            gdiNotifyURL: urlSettings.gdiNotifyURL // passato dalla init
            //gdiNotifyURL: 'http://localhost:3001/phoenix/waitingAuth'
        })
    });

    treeDsServerApp.post('/3ds-server/api/browserInformation', function (req, res) {
        res.sendStatus(200);
    });

    treeDsServerApp.post('/3ds-server/api/ResultRequest', function (req, res) {
        checkOtpResponse = req.body.checkOtpResponse;
        res.sendStatus(200);
    })
};

module.exports = define3dsServer;

function settings(treeDsServerApp) {
    treeDsServerApp.use('/static', express.static('views'));
    treeDsServerApp.set('view engine', 'ejs');
    treeDsServerApp.use(express.json());
    treeDsServerApp.use(express.urlencoded({
        extended: true
    }));
    treeDsServerApp.set('views', path.join(__dirname, '../views'));
    morganBody(treeDsServerApp);
}
