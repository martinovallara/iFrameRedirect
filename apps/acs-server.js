const request = require('request');
const path = require('path');
const express = require('express');
const morganBody = require('morgan-body');

const DENIED = 'DENIED';
const AUTHENTICATED = 'AUTHENTICATED';
function defineACSServer(acsServer) {
    //--------------- ACS-Server --------------------------------------//

    settings(acsServer);

    let checkOtpResponse;
    let message;
    let checkMessage = {};

// form per inserimento otp
    acsServer.get('/acs/auth', function (req, res) {
        checkMessage = { message: message };
        message = "";
        res.render('acs/auth', checkMessage);
    });

    acsServer.post('/acs/checkotp', function (req, res) {
        message = "";
        checkOtpResponse = req.body.otpValue === '123456' ? AUTHENTICATED : 'DENIED';

        request({
            url: 'http://localhost:3002/3ds-server/api/ResultRequest',
            method: 'POST',
            json: { checkOtpResponse: checkOtpResponse }
        }, function (error, response, body) {
            if (error != null) {
                res.sendStatus(500);
                return;
            }

            if (checkOtpResponse === DENIED) {
                message = "codice non valido";
                checkMessage = { message: message };
                res.render('acs/auth', checkMessage);
                return;
            };
            res.redirect('http://localhost:3001/phoenix/authNotify'); //<<-- fornito dalla init con authNotifyUrl. 
                                                            //verificare se nella documentazione EMVco 
                                                            //nella Areq, è prevista un campo dove passare 
                                                            //l'indirizzo di ritorno al termine della 
        });
    });
};

module.exports = defineACSServer;

function settings(acsServer) {
    acsServer.use('/static', express.static('views'));
    acsServer.set('view engine', 'ejs');
    acsServer.use(express.json());
    acsServer.use(express.urlencoded({
        extended: true
    }));
    acsServer.set('views', path.join(__dirname, '../views'));
    morganBody(acsServer);
}
