import gameProcess from './game/';
import GameManager from './game/GameManager';
import gameOver from './gameOver';
import gameProgress from './gameProgress';

import { getCookie } from './utils';

import socketHandler from './socketHandler';
import dispatcher from './dispatcher';

//todo разнести
import './index.css';

const config = {
    gameContainerId: 'game-container',
    gridSize: 10, // grid size
    tileCount: 60, // tile count
    snakeWaist: 5,
};

const snakeRoom = getCookie('snakeRoom');
const socket = io.connect(`/${snakeRoom}`);

socketHandler(socket, dispatcher);

const game = new GameManager(config, dispatcher);

setInterval(() => (game.step()), 200);
gameProcess(game);

gameOver();
gameProgress();