const express = require('express');
const path = require('path');
const request = require('request');
const url = require('url');    
const morganBody = require('morgan-body');
const urlSettings = require('../config');;

function defineMerchentWebSite(merchantWebSiteApp) {
  
    settings(merchantWebSiteApp);
    
    merchantWebSiteApp.get('/', function (req, res) {
        res.redirect('/merchant-website/index.html');
    });

    merchantWebSiteApp.post('/merchant-website/init', function (req, res) {

        request({
            url: 'http://localhost:3001/phoenix/api/init',
            method: 'POST',
            json: req.body
        }, function (error, response, body) {

            res.redirect(url.format({
                pathname: urlSettings.initURL,
                query: {
                    gdiURL: body.gdiURL
                 }
              }))
        });
    });

    merchantWebSiteApp.get('/merchant-website/init', function (req, res) {

        res.render('merchant-website/init', {
            gdiURL: req.query.gdiURL
        });

    })
    merchantWebSiteApp.get('/merchant-website/gdiNotify', function (req, res) {

        res.render('merchant-website/gdiNotify');

    })
/*
http://localhost:3000/merchant-website/gdiNotify
*/
    merchantWebSiteApp.get('/merchant-website/waitingAuth', function (req, res) {

        res.redirect('http://localhost:3001/phoenix/waitingAuth');

    })

    merchantWebSiteApp.get('/merchant-website/endTransaction', function (req, res) {
        res.render('merchant-website/endTransaction',
            { status: req.query.status });
    });
};

module.exports = defineMerchentWebSite;

function settings(merchantWebSiteApp) {
    merchantWebSiteApp.set('view engine', 'ejs');
    merchantWebSiteApp.use(express.json());
    merchantWebSiteApp.use(express.urlencoded({
        extended: true
    }));
    merchantWebSiteApp.use('/static', express.static('../views'));
    merchantWebSiteApp.use('/merchant-website', express.static('views/merchant-website'));
    merchantWebSiteApp.set('views', path.join(__dirname, '../views'));
    morganBody(merchantWebSiteApp);
}
