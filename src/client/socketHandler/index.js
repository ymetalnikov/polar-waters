const socketHandler = (socket, dispatcher) => {
    socket.emit('GAME_START');

    dispatcher.on('SET_SNAKE_MOTION', (payload) => {
        socket.emit('SET_SNAKE_MOTION', payload);
    });

    dispatcher.on('GAME_OVER', (payload) => {
        socket.emit('GAME_OVER', payload);
    });

    dispatcher.on('SET_FOOD_EATEN', (payload) => {
        socket.emit('SET_FOOD_EATEN', payload);
    });

    socket.on('joinToGame', function (payload) {
        dispatcher.trigger('SET_SNAKE', payload);
    });

    socket.on('setFood', function (payload) {
        dispatcher.trigger('SET_FOOD', payload);
    });

    socket.on('getRivalSnakes', function (payload) {
        dispatcher.trigger('GET_RIVAL_SNAKES', payload);
    });

    socket.on('gameOver', function (payload) {
        dispatcher.trigger('END_THE_GAME', payload);
    });
};

export default socketHandler;
