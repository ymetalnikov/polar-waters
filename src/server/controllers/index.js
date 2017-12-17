const express = require('express');
const router = express.Router();
const login = require('./login.js');
const select = require('./select.js');
const game = require('./game.js');
const create = require('./create.js');
const join = require('./join.js');

router.get('/', (request, response) => {
    response.render('pages/login', { error: '', countOfPlayers: 0, statistics: [] });
});

router.post('/login', login);

router.get('/select', select);

router.post('/create', create);

router.get('/join', join);

router.get('/game', game);

module.exports = router;
