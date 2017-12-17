const express = require('express');
const router = express.Router();
const { roomMap } = require('../services/Room');
const login = require('./login.js');
const select = require('./select.js');
const game = require('./game.js');
const create = require('./create.js');
const join = require('./join.js');


router.get('/', (request, response) => {
    const statistics = Object.values(roomMap).map((room) => {
        const snakePool = room.getSnakePool();

        return snakePool.getGameStatistic();
    });

    response.render('pages/login', { error: '', countOfPlayers: 0, statistics });
});

router.post('/login', login);

router.get('/select', select);

router.post('/create', create);

router.get('/join', join);

router.get('/game', game);

module.exports = router;
