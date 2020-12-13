require('dotenv').config();

var express = require('express');

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser'); 

var config = require('config');

var jwt = require('jsonwebtoken');

var cors = require('cors')

var app = express();

app.set('port', process.env.PORT || config.get('server.port'));
app.set('jwt', jwt);
app.set('verifyJWT', (req, res, next) => {
    var token = req.headers['authorization'];
    if (!token) return res.status(500).json({ auth: false, message: 'No token provided.' });
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });
      req.userId = decoded.id;
      next();
    });
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors())

var consign = require('consign');

consign()
    .then('/config/dbConnection.js')
    .then('/api/models')
    .then('/api/controllers')
    .then('/api/routes')
    .into(app);

module.exports = app;