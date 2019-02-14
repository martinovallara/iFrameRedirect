var express = require('express');
var app = express();

app.use('/static', express.static('public'));
app.use('/3ds-server', express.static('3ds-server'));
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/3ds-server/api/browserInformation', function (req, res) {
    res.sendStatus(200);
});

app.post('/3ds-server/api/verify', function (req, res) {
    res.sendStatus(200);
});

app.post('/3ds-server/api/auth', function (req, res) {
    setTimeout(sendStatus, 3000);

    function sendStatus() {
        res.sendStatus(200);
    }

});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});