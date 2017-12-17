class RoomStore {

    constructor() {
        this._roomMap = {};
    }

    getRoomList() {
        return Object.values(this._roomMap);
    }

    getRoomByCookies(cookies) {
        return this._roomMap[cookies]
    }

    deleteRoomByCookies(cookies) {
        delete this._roomMap[cookies];
    }

    clearByCookies(cookies) {
        this.getRoomList().forEach((room) => {
            room.snakePool.deleteSnakeByCookies(cookies);
        });
    };

    /**
     * Всем кто в игре продлеваем время сессии
     */
    updateTimeAllInRooms() {
        this.getRoomList().forEach((room) => {
                const snakes = room.snakePool.getAllSnakes();
                snakes.forEach((snake) => {
                    snake.updateTime();
                });
            }
        );
    }

    /**
     * Добавляем змею в комнату
     * @param room
     * @param snake
     * @returns {{roomCookieSign: *}}
     */
    joinToRoom(room, snake) {
        const snakePool = room.getSnakePool();

        this.getRoomList().forEach((room) => {
            const snakePool = room.getSnakePool();

            snakePool.deleteSnakeByCookies(snake.cookies);
        });

        snakePool.add(snake);
    };

    /**
     * Добавляем комнату
     * @param room
     * @returns {{roomCookieSign: *}}
     */
    addRoom(room) {
        this._roomMap[room.getRoomId()] = room;
    };
}

module.exports = RoomStore;
