var http = require('http');
var express = require('express');
var less = require('less');
var lessMiddleware = require('less-middleware');
var port = process.env.VMC_APP_PORT || 1337;
var app = express();
app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(lessMiddleware({src: __dirname + '/public'}));
	app.use(express.static(__dirname + '/public'));
	app.use(express.methodOverride());
	app.use(app.router);
});

app.get('*', function(req, res, s, next) {
	next();
});

app.get('/', function(req, res) {
	res.render('index', {
		'title': 'Home'
	});
});

app.get('/about', function(req, res) {
	res.render('about', {
		'title': 'About'
	});
});

app.get('/services/getUser/:id', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({"name": "anthony gray", "id":  req.params.id}));
});

app.listen(port);

/*
var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello my man from <a href="http://appfog.com">AppFog.com</a>');
}).listen(process.env.VMC_APP_PORT || 1337, null);
*/