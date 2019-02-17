var path = require('path');
var express = require('express');
var request = require('request');
var app = express();
var morgan = require('morgan');

var morganBody = require('morgan-body');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

morganBody(app);

//app.use(morgan('short'));
app.use('/static', express.static('public'));
app.use('/merchant-website', express.static('public/views'));
app.use('/3ds-server/views', express.static('3ds-server/views'));
app.use('/3ds-server-gateway/views', express.static('/3ds-server-gateway/views'));
//app.use('/acs', express.static('acs'));

app.set('views', path.join(__dirname, '/public'));
//------ merchant-website -------------------//

app.get('/merchant-website/endTransaction', function (req, res) {
    res.render('merchant-website/endTransaction',
        { status: req.query.status });
});

//-----  3ds-server-gateway-----------------//

app.post('/3ds-server-gateway/init', function (req, res) {

    request({
        url: 'http://localhost:3000/3ds-server/api/init',
        method: 'POST',
        json: req.body
    }, function (error, response, body) {
        res.render('3ds-server-gateway/init', {
            gdiUrl: body.gdiUrl
        })
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

//--------------- 3DS-Server --------------------------------------//

app.post('/3ds-server/api/init', function (req, res) {
    console.log('req.query: ' + req.query.pan);
    console.log('req.params: ' + req.params.pan);
    console.log('req.body: ' + JSON.stringify(req.body));

    setTimeout(sendStatus, 1000);

    function sendStatus() {
        res.status(200).send({
            gdiUrl: 'http://localhost:3000/3ds-server/frame'
        });
    }
});

app.post('/3ds-server/api/auth', function (req, res) {
    setTimeout(sendStatus, 3000);

    function sendStatus() {
        res.status(200).send('challenge');
    }
});

app.get('/3ds-server/api/verify', function (req, res) {
    res.status(200).send({ status: checkOtpResponse });
});

//---- 3DS-Server -- hidden service ------------//
app.get('/3ds-server/frame', function (req, res) {
    res.render('3ds-server/frame', {
        gdiNotifyUrl: '/merchant-website/gdiNotify.html' // passato dalla init
    })
});

app.post('/3ds-server/api/browserInformation', function (req, res) {
    res.sendStatus(200);
});



//-----------------------------------------------------------------//


//------- ACS ----- //
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

//-----------------------------------------------------------------
app.get('/', function (req, res) {
    res.redirect('/merchant-website/index.html');
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});