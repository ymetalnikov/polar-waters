const { roomMap } = require('./index');

const getStatisticsForSelect = (snakeName, cookiesSnakeName) => {
    return Object.values(roomMap)
    // Если событие сокета disconnect еще не произошло
        .filter((room) => (!room.snakePool.findSnakeByCookie(cookiesSnakeName)))
        .map((room) => {
            const snakePool = room.getSnakePool();

            let href = '#';
            if (snakePool.getLength() < 3) {
                href = `/join?roomid=${room.getRoomId()}&name=${snakeName}`
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