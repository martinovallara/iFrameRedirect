var request = require('request');

function defineACSServer(app) {
    //--------------- ACS-Server --------------------------------------//

    var checkOtpResponse;
    var message;
    app.post('/acs/checkotp', function (req, res) {
        message = "";
        checkOtpResponse = req.body.otpValue === '123456' ? 'AUTHENTICATED' : 'DENIED';
    
        if (checkOtpResponse === 'DENIED') {
            message = "codice non valido";
            res.redirect('/acs/auth')
        }
    
        res.redirect('/3ds-server-gateway/authNotify');
    });
    
    app.get('/acs/auth', function (req, res) {
        var renderData = { message: message };
        message = "";
        res.render('acs/auth', renderData);
    
    });
};

module.exports = defineACSServer;