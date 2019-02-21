
var request = require('request');
var path = require('path');
var express = require('express');
var morganBody = require('morgan-body');

function definePhoenix(phoenixApp) {

    //-----  phoenix-----------------//

    settings(phoenixApp);
    //--- API esposte verso merchant ------//

    phoenixApp.post('/phoenix/init', function (req, res) {
        request({
            url: 'http://localhost:3002/3ds-server/api/init',
            method: 'POST',
            json: req.body
        }, function (error, response, body) {
            res.render('phoenix/init', {
                gdiUrl: body.gdiUrl
            });
        });
    });

    //------- API esposte verso 3DS-Server ---------// 
    /* 
    needed for close the hidden iframe, and show form otp,
    changing href location of parent window
    */
    phoenixApp.get('/phoenix/gdiNotify', function (req, res) {
        res.render('phoenix/gdiNotify')
    });

    phoenixApp.get('/phoenix/authNotify', function (req, res) {
        res.redirect('/phoenix/verify') 
    });

    // ----- private API ----------- // 
    phoenixApp.get('/phoenix/waitingAuth', function (req, res) {
        request({
            url: 'http://localhost:3002/3ds-server/api/auth',
            method: 'POST',
            json: {}
        }, function (error, response, body) {
            if (body.tranStatus === 'CHALLENGE') {
                /*
                challenge solution via iFrame

                res.render('phoenix/waitingAuth', {
                    authUrl: body.authUrl
                });
                */

                /* challenge solution via redirect */
                res.redirect(body.authUrl)

            } else {
                console.log('frictionless not implemented')
                res.sendStatus(500);
            }
        });
    });

    phoenixApp.get('/phoenix/verify', function (req, res) {
        request({
            url: 'http://localhost:3002/3ds-server/api/verify',
            method: 'GET',
            json: {}
        }, function (error, response, body) {
            res.redirect('http://localhost:3000/merchant-website/endTransaction?status=' + body.status);
        });
    });

    phoenixApp.get('/', function (req, res) {
        res.send("I'm phoenix");
    });
};

module.exports = definePhoenix;    

function settings(phoenixApp) {
    phoenixApp.set('view engine', 'ejs');
    phoenixApp.use('/static', express.static('../views'));
    phoenixApp.use(express.json());
    phoenixApp.use(express.urlencoded({
        extended: true
    }));
    phoenixApp.set('views', path.join(__dirname, '../views'));
    morganBody(phoenixApp);
}
