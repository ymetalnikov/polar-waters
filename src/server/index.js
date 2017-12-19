const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const cookieParser = require('cookie-parser');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { checkAuth } = require('./middleware');
const { roomStore } = require('./models/Room');
const { snakeStore } = require('./models/Snake');
const { ONE_MINUTE } = require('./constants');

app.use(cookieParser());
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, '../../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(validator());
app.use(checkAuth);
// eslint-disable-next-line no-undef
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

const controller = require('./controllers');
const socketHandler = require('./io');

// чистим бездействующих змеек
const clearObsoleteSnakes = () => {
    roomStore.updateTimeAllInRooms();
    snakeStore.clearObsolete();
};

setInterval(clearObsoleteSnakes, ONE_MINUTE * 10);

app.use('/', controller);
socketHandler(io);

module.exports = server;
