var path = require('path');
var express = require('express');
var request = require('request');
var app = express();
app.set('view engine', 'ejs');

app.use('/static', express.static('public'));
app.use('/merchant-website', express.static('public/views'));
app.use('/3ds-server/views', express.static('3ds-server/views'));
app.use('/3ds-server-gateway/views', express.static('/3ds-server-gateway/views'));
app.use('/acs', express.static('acs'));

app.set('views', path.join(__dirname, '/public'));

app.post('/3ds-server-gateway/init', function (req, res) {
    request('http://localhost:3000/3ds-server/api/init', { pan: '123' }, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log(body.url);
        console.log(body.explanation);
    });
    //res.sendFile(path.join(__dirname, '/3ds-server-gateway/views/init.html'));
    res.render('3ds-server-gateway/init', {gdiUrl:'/3ds-server/views/frame.html'})
});


app.post('/3ds-server/api/browserInformation', function (req, res) {
    res.redirect('/static/gdiNotify.html');
});

app.post('/3ds-server/api/verify', function (req, res) {
    res.sendStatus(200);
});

app.post('/3ds-server/api/init', function (req, res) {
    setTimeout(sendStatus, 1000);

    function sendStatus() {
        res.status(200).send('http://localhost:3000/3ds-server/frame.html');
    }
});

app.post('/3ds-server/api/auth', function (req, res) {
    setTimeout(sendStatus, 3000);

    function sendStatus() {
        res.status(200).send('challenge');
    }
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});