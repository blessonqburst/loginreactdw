var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var httpProxy = require('http-proxy');

var app = express();
const proxy = httpProxy.createProxyServer({
  target: 'http://localhost:8080/login?login=sample&password=sample',
});

app.set('port', (process.env.PORT || 3030));

app.use('/', express.static(path.join(__dirname, '')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Additional middleware which will set headers that we need on each request.
app.use(function (req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

app.get('/logindata', function (req, res) {
  console.log('get data', req.body);
});

app.post('/logindata', function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const newUrl = `http://localhost:8080/login?login=${username}&password=${password}`;
  console.log(newUrl);
  proxy.web(req, res, { target: newUrl });
});

app.listen(app.get('port'), function () {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
