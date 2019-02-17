var request = require('request');

function defineMerchentWebSite(app) {
    app.get('/merchant-website/endTransaction', function (req, res) {
        res.render('merchant-website/endTransaction',
            { status: req.query.status });
    });

};

module.exports = defineMerchentWebSite;