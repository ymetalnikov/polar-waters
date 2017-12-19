import { Dispatcher } from '../dispatcher';

const keyPush = (evt, game) => {
    switch (evt.keyCode) {
    case 37:
        game.setSnakeVelocity(-1, 0);
        break;
    case 38:
        game.setSnakeVelocity(0, -1);
        break;
    case 39:
        game.setSnakeVelocity(1, 0);
        break;
    case 40:
        game.setSnakeVelocity(0, 1);
        break;
    }
};
const handleClick = (evn, game) => {
    const target = evn.target;

    if (target.id === 'canvas-id') {
        const targetBCR = target.getBoundingClientRect();
        const isUp = (target.clientHeight / 2) > (evn.clientY - targetBCR.top);
        const isDown = (target.clientHeight / 2) < (evn.clientY - targetBCR.top);
        const isLeft = (target.clientWidth / 2) > (evn.clientX - targetBCR.left);
        const isRight = (target.clientWidth / 2) < (evn.clientX - targetBCR.left);

        let velocityX = 0;
        let velocityY = 0;

        if (isUp) {
            velocityY = -1;
        }

        if (isDown) {
            velocityY = 1;
        }

        if (isLeft) {
            velocityX = -1;
        }

        if (isRight) {
            velocityX = 1;
        }

        game.setSnakeVelocity(velocityX, velocityY);
    }
};

export default function gameProcess(game) {

    Dispatcher.on('SET_SNAKE', (payload) => {game.setSnake(payload.position, payload.name, payload.color);});
    Dispatcher.on('SET_FOOD', (payload) => {game.setFood(payload.foodCoordinate, payload.foodIcon);});
    Dispatcher.on('GET_RIVAL_SNAKES', (payload) => {game.setRivals(payload);});

    document.addEventListener('keydown', (e) => (keyPush(e, game)));
    document.addEventListener('click', (e) => (handleClick(e, game)));
    document.addEventListener('visibilitychange',
        () => {
            // if (document.hidden) {
            //     console.log('Редирект');
            //     location.href = `/select?name=${game.snake.name}`;
            // }
        },
        false
    );
}