var request = require('request');

function define3dsServer(app) {
    //--------------- 3DS-Server --------------------------------------//

    app.post('/3ds-server/api/init', function (req, res) {

        setTimeout(sendStatus, 2000);

        function sendStatus() {
            res.json({
                gdiUrl: 'http://localhost:3000/3ds-server/frame'
            });
        }
    });

    app.post('/3ds-server/api/auth', function (req, res) {
        setTimeout(sendStatus, 2000);

        function sendStatus() {
            res.json({
                tranStatus: 'CHALLENGE',
                authUrl: '/acs/auth'
            });
        }
    });

    app.get('/3ds-server/api/verify', function (req, res) {
        /* res.json({
             status: checkOtpResponse
         });
 */

        res.json({ status: checkOtpResponse });
    });

    //---- 3DS-Server -- hidden service ------------//
    app.get('/3ds-server/frame', function (req, res) {
        res.render('3ds-server/frame', {
            gdiNotifyUrl: '/3ds-server-gateway/gdiNotify' // passato dalla init
        })
    });

    app.post('/3ds-server/api/browserInformation', function (req, res) {
        res.sendStatus(200);
    });
    var checkOtpResponse = null;
    app.post('/3ds-server/api/ResultRequest', function (req, res) {

        checkOtpResponse = req.body.checkOtpResponse;
        res.sendStatus(200);
    })
};

module.exports = define3dsServer;