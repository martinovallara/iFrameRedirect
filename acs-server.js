var request = require('request');
var path = require('path');
var express = require('express');
var morganBody = require('morgan-body');

const DENIED = 'DENIED';
const AUTHENTICATED = 'AUTHENTICATED';
function defineACSServer(AcsServer) {
    //--------------- ACS-Server --------------------------------------//

    AcsServer.use('/static', express.static('public'));
    AcsServer.set('view engine', 'ejs');

    AcsServer.use(express.json());
    AcsServer.use(express.urlencoded({
        extended: true
    }));
    AcsServer.set('views', path.join(__dirname, '/public'));
    AcsServer.use('/acs-server/views', express.static('acs-server/views'));
    morganBody(AcsServer);


    //----------------------------------------------------------------//
    var checkOtpResponse;
    var message;
    var renderData = {};
    AcsServer.post('/acs/checkotp', function (req, res) {
        message = "";
        checkOtpResponse = req.body.otpValue === '123456' ? AUTHENTICATED : 'DENIED';

        request({
            url: 'http://localhost:3002/3ds-server/api/ResultRequest',
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
            res.redirect('http://localhost:3001/3ds-server-gateway/authNotify'); //<<-- fornito dalla init con authNotifyUrl. 
                                                            //verificare se nella documentazione EMVco 
                                                            //nella Areq, è prevista un campo dove passare 
                                                            //l'indirizzo di ritorno al termine della 
        });
    });

    AcsServer.get('/acs/auth', function (req, res) {
        renderData = { message: message };
        message = "";
        res.render('acs/auth', renderData);

    });
};

module.exports = defineACSServer;