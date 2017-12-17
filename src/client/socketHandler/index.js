const socketHandler = (socket, dispatcher) => {
    socket.emit('GAME_START');

    document.addEventListener('SET_SNAKE_MOTION', (e) => {
        const payload = e.detail.payload;

        socket.emit('SET_SNAKE_MOTION', payload);
    });

    document.addEventListener('GAME_OVER', (e) => {
        const payload = e.detail.payload;

        socket.emit('GAME_OVER', payload);
    });

    document.addEventListener('SET_FOOD_EATEN', (e) => {
        const payload = e.detail.payload;

        socket.emit('SET_FOOD_EATEN', payload);
    });

    socket.on('joinToGame', function (payload) {
        dispatcher('SET_SNAKE', payload);
    });

    socket.on('setFood', function (payload) {
        dispatcher('SET_FOOD', payload);
    });

    socket.on('getRivalSnakes', function (payload) {
        dispatcher('GET_RIVAL_SNAKES', payload);
    });

    socket.on('gameOver', function (payload) {
        dispatcher('END_THE_GAME', payload);
    })
};

export default socketHandler;
