import gameProcess from './game/';
import GameManager from './game/GameManager';
import gameOver from './gameOver';
import gameProgress from './gameProgress';
import { getCookie } from './utils';
import socketHandler from './socketHandler';
import { Dispatcher } from './dispatcher';
import { client } from '../share/config';

//todo разнести
import './index.css';

const config = {
    gameContainerId: 'game-container',
    gridSize: 10, // grid size
    tileCount: 60, // tile count
    snakeWaist: 5,
};

const snakeRoom = getCookie('snakeRoom');
// eslint-disable-next-line no-undef
const socket = io.connect(`/${snakeRoom}`);

socketHandler(socket, Dispatcher);

const game = new GameManager(config, Dispatcher);

setInterval(() => (game.step()), client.SPEED_GAME);
gameProcess(game);

gameOver();
gameProgress();