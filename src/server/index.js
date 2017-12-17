const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const cookieParser = require('cookie-parser');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(validator());

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(function (request, response, next) {
    request.io = io;
    next();
});

const controller = require('./controller');
const socketHandler = require('./io');

app.use('/', controller);
socketHandler(io);

module.exports = server;