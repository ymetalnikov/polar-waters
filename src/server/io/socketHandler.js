const cookie = require("cookie");
const { emitter, constants: { CLOSE_ROOM } } = require('../models/Emitter');

const LISTEN_EVENTS = {
    GAME_START: 'GAME_START',
    SET_FOOD_EATEN: 'SET_FOOD_EATEN',
    SET_SNAKE_MOTION: 'SET_SNAKE_MOTION',
    GAME_OVER: 'GAME_OVER',
};

const EMIT_EVENTS = {
    JOIN_TO_GAME: 'joinToGame',
    GAME_OVER: 'gameOver',
    SET_FOOD: 'setFood',
    GET_RIVAL_SNAKES: 'getRivalSnakes'
};

const socketHandler = function (io, socket, room) {

    if (!room) {
        console.warn('room not found');
        return
    }

    const nameSpace = `/${room.getRoomId()}`;
    const snakePool = room.getSnakePool();
    const food = room.getFood();
    const snakeCookie = socket.handshake.headers.cookie;
    const cookieSnakeName = cookie.parse(snakeCookie).snakeName;
    const snake = snakePool.findSnakeByCookies(cookieSnakeName);

    if (!snake) {
        console.warn('snake not found');
        return
    }

    const handlerGameStart = () => {
        food.reset();
        socket.emit(EMIT_EVENTS.SET_FOOD, food.get());
        if (!snake.isGaming) {
            snakePool.addToGame(snake);
            socket.emit(EMIT_EVENTS.JOIN_TO_GAME, snake);
        }
    };
    const handleFoodEaten = () => {
        food.reset();
    };
    const handleSnakeMotion = (data) => {
        const rivalSnakes = snakePool.getRivals(snake);

        snake.position = data;
        socket.emit(EMIT_EVENTS.GET_RIVAL_SNAKES, rivalSnakes);
        socket.emit(EMIT_EVENTS.SET_FOOD, food.get());
    };
    const handleDisconnect = () => {
        snakePool.gameOverSnakeByCookies(cookieSnakeName);

        if (!snakePool.checkWhoIsInTheGame()) {
            snakePool.reset();
            emitter.emit('CLOSE_ROOM', room.getRoomId());
        }
    };
    const handleGameOver = () => {
        snakePool.gameOverSnakeByCookies(cookieSnakeName);

        const isGameOver = !snakePool.checkWhoIsInTheGame();
        const statistic = snakePool.getGameStatistic();

        if (isGameOver) {
            snakePool.reset();
            io.of(nameSpace).emit(
                EMIT_EVENTS.GAME_OVER,
                {
                    statistic,
                    isGameOver
                }
            );

            emitter.emit('CLOSE_ROOM', room.getRoomId());
        } else {
            socket.emit(EMIT_EVENTS.GAME_OVER, { statistic, isGameOver: isGameOver });
        }
    };

    socket.on(LISTEN_EVENTS.GAME_START, handlerGameStart);
    socket.on(LISTEN_EVENTS.SET_FOOD_EATEN, handleFoodEaten);
    socket.on(LISTEN_EVENTS.SET_SNAKE_MOTION, handleSnakeMotion);
    socket.on(LISTEN_EVENTS.GAME_OVER, handleGameOver);
    socket.on('disconnect', handleDisconnect);
};

module.exports = socketHandler;