var path = require('path');
var express = require('express');
var app = express();
var morganBody = require('morgan-body');

const define3dsServerGateway = require('./3ds-server-gateway');
const define3dsServer = require('./3ds-server');
const defineMerchantWebSite = require('./merchant-website-server');
const defineACSServer = require('./acs-server');

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

defineMerchantWebSite(app);
define3dsServerGateway(app);
define3dsServer(app);
defineACSServer(app);


//-----------------------------------------------------------------
app.get('/', function (req, res) {
    res.redirect('/merchant-website/index.html');
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});