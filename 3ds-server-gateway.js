var request = require('request');

function define3dsServerGateway(app) {
    //-----  3ds-server-gateway-----------------//
    app.post('/3ds-server-gateway/init', function (req, res) {
        request({
            url: 'http://localhost:3000/3ds-server/api/init',
            method: 'POST',
            json: req.body
        }, function (error, response, body) {
            res.render('3ds-server-gateway/init', {
                gdiUrl: body.gdiUrl
            });
        });
    });
    app.get('/3ds-server-gateway/authNotify', function (req, res) {
        request({
            url: 'http://localhost:3000/3ds-server/api/verify',
            method: 'GET',
            json: {}
        }, function (error, response, body) {
            res.redirect('/merchant-website/endTransaction?status=' + body.status);
        });
    });

    app.get('/3ds-server-gateway/gdiNotify', function (req, res) {

        res.render('3ds-server-gateway/gdiNotify')

    });

    app.get('/3ds-server-gateway/waitingAuth', function (req, res) {
        request({
            url: 'http://localhost:3000/3ds-server/api/auth',
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

};

module.exports = define3dsServerGateway;