var path = require('path');
var express = require('express');
var request = require('request');
var app = express();
var morgan = require('morgan');

app.set('view engine', 'ejs');
app.use(morgan('combined'));
app.use('/static', express.static('public'));
app.use('/merchant-website', express.static('public/views'));
app.use('/3ds-server/views', express.static('3ds-server/views'));
app.use('/3ds-server-gateway/views', express.static('/3ds-server-gateway/views'));
app.use('/acs', express.static('acs'));

app.set('views', path.join(__dirname, '/public'));

app.post('/3ds-server-gateway/init', function (req, res) {
    request({
        url: 'http://localhost:3000/3ds-server/api/init',
        method: 'POST',
        json: {pan: '123'}
      }, function(error, response, body){

        console.log('response 3ds-server/init' + body);

      });


    //res.sendFile(path.join(__dirname, '/3ds-server-gateway/views/init.html'));
    res.render('3ds-server-gateway/init', { gdiUrl: '/3ds-server/frame' })
});

app.get('/3ds-server/frame', function (req, res) {
    res.render('3ds-server/frame', { gdiNotifyUrl: '/merchant-website/gdiNotify.html' })
});

app.post('/3ds-server/api/browserInformation', function (req, res) {
    //res.redirect('/static/gdiNotify.html');
    res.sendStatus(200);
});

app.post('/3ds-server/api/verify', function (req, res) {
    res.sendStatus(200);
});

app.post('/3ds-server/api/init', function (req, res) {

    setTimeout(sendStatus, 1000);

    function sendStatus() {
        res.status(200).send({ gdiUrl: 'http://localhost:3000/3ds-server/frame.html' });
    }
});

app.post('/3ds-server/api/auth', function (req, res) {
    setTimeout(sendStatus, 3000);

    function sendStatus() {
        res.status(200).send('challenge');
    }
});

app.get('/', function (req, res) {
    res.redirect('/merchant-website/index.html');
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});