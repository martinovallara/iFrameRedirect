
var request = require('request');
var path = require('path');
var express = require('express');
var morganBody = require('morgan-body');

function define3dsServerGateway(phoenixApp) {

    //-----  3ds-server-gateway-----------------//

    phoenixApp.set('view engine', 'ejs');

    phoenixApp.use('/static', express.static('public'));
    phoenixApp.use(express.json());
    phoenixApp.use(express.urlencoded({
        extended: true
    }));
    phoenixApp.set('views', path.join(__dirname, '/public'));
    phoenixApp.use('/3ds-server-gateway/views', express.static('/3ds-server-gateway/views'));

    morganBody(phoenixApp);
    //--- API esposte verso merchant ------//

    phoenixApp.post('/3ds-server-gateway/init', function (req, res) {
        request({
            url: 'http://localhost:3002/3ds-server/api/init',
            method: 'POST',
            json: req.body
        }, function (error, response, body) {
            res.render('3ds-server-gateway/init', {
                gdiUrl: body.gdiUrl
            });
        });
    });

    //------- API esposte verso 3DS-Server ---------// 
    phoenixApp.get('/3ds-server-gateway/gdiNotify', function (req, res) {

        res.render('3ds-server-gateway/gdiNotify')

    });

    phoenixApp.get('/3ds-server-gateway/authNotify', function (req, res) {
        res.render('3ds-server-gateway/authNotify');

    });
    // ----- private API ----------- // 
    phoenixApp.get('/3ds-server-gateway/waitingAuth', function (req, res) {
        request({
            url: 'http://localhost:3002/3ds-server/api/auth',
            method: 'POST',
            json: {}
        }, function (error, response, body) {
            if (body.tranStatus === 'CHALLENGE') {
                res.render('3ds-server-gateway/waitingAuth', {
                    authUrl: body.authUrl
                });
            } else {
                console.log('non challenge!!!')
                res.status(500);
            }
        });
    });

    phoenixApp.get('/', function (req, res) {
        res.send("I'm phoenix");
    });
    

    phoenixApp.get('/3ds-server-gateway/verify', function (req, res) {
        request({
            url: 'http://localhost:3002/3ds-server/api/verify',
            method: 'GET',
            json: {}
        }, function (error, response, body) {
            res.redirect('http://localhost:3000/merchant-website/endTransaction?status=' + body.status);
        });
    });

};

module.exports = define3dsServerGateway;    