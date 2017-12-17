;(function () {

// возвращает cookie с именем name, если есть, если нет, то undefined
    function getCookie(name) {
        const matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    function dispatcher(name, payload) {
        const customEvent = new CustomEvent(name, {
            detail: { payload }
        });

        document.dispatchEvent(customEvent);
    }

    const snakeRoom = getCookie('snakeRoom');
    const socket = io.connect(`/${snakeRoom}`);

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
})();