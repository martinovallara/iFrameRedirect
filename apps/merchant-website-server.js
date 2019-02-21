var express = require('express');
var path = require('path');

function defineMerchentWebSite(merchantWebSiteApp) {
  
    settings(merchantWebSiteApp);
    
    merchantWebSiteApp.get('/', function (req, res) {
        res.redirect('/merchant-website/index.html');
    });

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
}
