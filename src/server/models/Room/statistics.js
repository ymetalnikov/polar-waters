const { roomStore } = require('./index');

const getStatisticsForSelect = (cookiesSnakeName) => {
    return roomStore.getRoomList()
    // Если событие сокета disconnect еще не произошло
        .filter((room) => (!room.snakePool.findSnakeByCookies(cookiesSnakeName)))
        .map((room) => {
            const snakePool = room.getSnakePool();

            let href = '#';
            if (snakePool.getLength() < 3) {
                href = `/join?roomid=${room.getRoomId()}`;
            }

            return {
                href,
                gameStatistic: snakePool.getGameStatistic(),
                roomName: room.getName(),
            };
        });
};

module.exports = {
    getStatisticsForSelect
};