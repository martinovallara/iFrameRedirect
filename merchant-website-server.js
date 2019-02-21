var express = require('express');
var path = require('path');

function defineMerchentWebSite(merchantWebSiteApp) {
    merchantWebSiteApp.set('view engine', 'ejs');

    merchantWebSiteApp.use(express.json());
    merchantWebSiteApp.use(express.urlencoded({
        extended: true
    }));

    merchantWebSiteApp.use('/static', express.static('public'));
    merchantWebSiteApp.use('/merchant-website', express.static('public/views'));
    merchantWebSiteApp.set('views', path.join(__dirname, '/public'));

    merchantWebSiteApp.get('/merchant-website/endTransaction', function (req, res) {
        res.render('merchant-website/endTransaction',
            { status: req.query.status });
    });

    merchantWebSiteApp.get('/', function (req, res) {
        res.redirect('/merchant-website/index.html');
    });
};

module.exports = defineMerchentWebSite;