var request = require('request');

const DENIED = 'DENIED';
const AUTHENTICATED = 'AUTHENTICATED';
function defineACSServer(app) {
    //--------------- ACS-Server --------------------------------------//

    var checkOtpResponse;
    var message;
    var renderData = {};
    app.post('/acs/checkotp', function (req, res) {
        message = "";
        checkOtpResponse = req.body.otpValue === '123456' ? AUTHENTICATED : 'DENIED';

        request({
            url: 'http://localhost:3000/3ds-server/api/ResultRequest',
            method: 'POST',
            json: { checkOtpResponse: checkOtpResponse }
        }, function (error, response, body) {
            if (error != null) {
                res.sendStatus(500);
            }

            if (checkOtpResponse === DENIED) {
                message = "codice non valido";
                renderData = { message: message };
                res.render('acs/auth', renderData);
                return
            };
            res.redirect('/3ds-server-gateway/authNotify'); //<<-- fornito dalla init con authNotifyUrl. 
                                                            //verificare se nella documentazione EMVco 
                                                            //nella Areq, è prevista un campo dove passare 
                                                            //l'indirizzo di ritorno al termine della 
        });
    });

    app.get('/acs/auth', function (req, res) {
        renderData = { message: message };
        message = "";
        res.render('acs/auth', renderData);

    });
};

module.exports = defineACSServer;