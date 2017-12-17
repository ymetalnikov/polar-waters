// utils
const createCanvas = (wrapperId, size) => {
    const wrapper = document.getElementById(wrapperId);
    const canvas = document.createElement('canvas');

    canvas.id = 'canvas-id';
    canvas.height = size;
    canvas.width = size;

    const ctx = canvas.getContext('2d');

    wrapper.appendChild(canvas);

    return { canvas, ctx };
};
const clearCanvas = (ctx, canvas) => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
const createFoodImg = (gameContainerId, position, icon, gridSize) => {
    const container = document.getElementById(gameContainerId);
    const images = document.getElementsByClassName('foodIcon');

    if (images[0]) {
        container.removeChild(images[0]);
    }

    const drawing = new Image();

    drawing.src = icon;
    drawing.style.left = position.x * gridSize + 'px';
    drawing.style.top = position.y * gridSize + 'px';
    drawing.style.position = 'absolute';
    drawing.className = 'foodIcon';
    container.appendChild(drawing);
};
const clearFoodImg = (gameContainerId) => {
    const container = document.getElementById(gameContainerId);
    const images = document.getElementsByClassName('foodIcon');

    if (images[0]) {
        container.removeChild(images[0]);
    }
};
const createPartOfSnake = (ctx, position, fat, color) => {
    const { x, y } = position;

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, fat, 0, 2 * Math.PI);
    ctx.fill();
};
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
        const isUp = (target.clientHeight/2) > (evn.clientY - targetBCR.top);
        const isDown = (target.clientHeight/2) < (evn.clientY - targetBCR.top);
        const isLeft = (target.clientWidth/2) > (evn.clientX - targetBCR.left);
        const isRight = (target.clientWidth/2) < (evn.clientX - targetBCR.left);

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

const dispatcher = (name, payload) => {
    const customEvent = new CustomEvent(name, {
        detail: { payload }
    });

    document.dispatchEvent(customEvent);
};

class Food {
    constructor(position, icon) {
        this.position = position || { x: null, y: null };
        this.isEaten = false;
        this.icon = icon;
    }

    getPosition() {
        return this.position;
    }
}

class Snake {
    constructor(position, name, color) {
        this.position = position || { x: null, y: null };
        this.velocity = { x: 0, y: 0 };
        this.trail = [this.position];
        this.tail = 5;
        this.name = name;
        this.color = color;
    }

    setPosition(x, y) {
        const isVelocity = this.velocity.x || this.velocity.y;

        if (isVelocity) {
            this.position = { x, y };
            this.trail.push({ x, y });

            while (this.trail.length > this.tail) {
                this.trail.shift();
            }
        }
    }

    setVelocity(x, y) {
        this.velocity = { x, y };
    }
}

class Game {

    constructor(config) {
        this.config = Object.assign({}, config);
        const { gameContainerId, gridSize, tileCount } = this.config;
        const { canvas, ctx } = createCanvas(gameContainerId, gridSize * tileCount);

        this.canvas = canvas;
        this.ctx = ctx;

        this.snake = undefined;
        this.food = undefined;
        this.isNewFood = false;
        this.rivals = [];
    }

    setSnake(position, name, color) {
        this.snake = new Snake(position[0], name, color);
    }

    setSnakeVelocity(x, y) {
        if (!this.isGameOver) {

            let newX = x;
            let newY = y;
            const velocity = this.snake.velocity;

            if (velocity.x !== 0 && x !== 0) {
                newX = 0;
            }

            if (velocity.y !== 0 && y !== 0) {
                newY = 0
            }

            if (
                Math.abs(velocity.x) !== Math.abs(newX)
                && Math.abs(velocity.y) !== Math.abs(newY)
            ) {
                this.snake.setVelocity(newX, newY);
            }

            if (velocity.x === 0 && velocity.y === 0) {

                if (newX !== 0 && newY !== 0) {
                    newY = 0;
                }

                this.snake.setVelocity(newX, newY);
            }
        }
    }

    setRivals(rivals) {
        this.rivals = rivals;
    }

    setFood(position, icon) {
        if (!position || !icon) {
            return
        }

        const isFood = !!this.food;

        if (!isFood || (this.food.position.x !== position.x || this.food.position.y !== position.y)) {
            this.food = new Food({ x: position.x, y: position.y }, icon);
            this.isNewFood = true;
        }
    }

    step() {
        if(this.snake) {
            this.stepSnake();
            this.checkGameOver();
            this.draw();
        }
    }

    stepSnake() {
        const { position, velocity } = this.snake;
        const newPosition = {
            x: position.x + velocity.x,
            y: position.y + velocity.y
        };

        this.snake.setPosition(
            newPosition.x,
            newPosition.y
        );

        if (this.food) {
            const foodPosition = this.food.getPosition();

            if (
                (foodPosition.x === newPosition.x || foodPosition.x + 1 === newPosition.x )
                && (foodPosition.y === newPosition.y || foodPosition.y + 1 === newPosition.y)
            ) {
                this.snake.tail += 1;
                this.food = undefined;
                dispatcher('SET_FOOD_EATEN', this.snake.trail);
            }
        }

        dispatcher('SET_SNAKE_MOTION', this.snake.trail);
    }

    checkGameOver() {
        const { position, trail } = this.snake;
        const { tileCount } = this.config;
        if (position.x < 0) {
            this.dispatchGameOver();
        }
        if (position.x > tileCount - 1) {
            this.dispatchGameOver();
        }
        if (position.y < 0) {
            this.dispatchGameOver();
        }
        if (position.y > tileCount - 1) {
            this.dispatchGameOver();
        }

        const trailWithoutHead = trail.slice(0, trail.length - 1);

        trailWithoutHead.forEach((trailItem) => {
            if( trailItem.x === position.x && trailItem.y === position.y){
                this.dispatchGameOver();
            }
        });
    }

    draw() {
        clearCanvas(this.ctx, this.canvas);

        this.drawSnake();
        this.drawFood();
        this.drawRivals();
    }

    drawFood() {
        if (!this.food) {
            clearFoodImg(this.config.gameContainerId);
            return
        }

        if (!this.isNewFood) {
            return
        } else {
            this.isNewFood = false;
        }

        const { gridSize, gameContainerId } = this.config;
        const { position, icon } = this.food;

        createFoodImg(gameContainerId, position, icon, gridSize);
    }

    drawSnake() {
        if (!this.snake) {
            return
        }

        const { gridSize, snakeWaist } = this.config;

        for (let i = 0; i < this.snake.trail.length; i++) {
            const position = {
                x: this.snake.trail[i].x * gridSize + snakeWaist,
                y: this.snake.trail[i].y * gridSize + snakeWaist
            };

            createPartOfSnake(this.ctx, position, snakeWaist, this.snake.color);
        }

    }

    drawRivals() {
        const { x, y } = this.snake.position;
        const { gridSize, snakeWaist } = this.config;

        this.rivals.forEach((rivalSnake) => {
            if (rivalSnake.position) {
                rivalSnake.position.forEach((positionItem) => {
                    if (x === positionItem.x && y === positionItem.y) {
                        this.dispatchGameOver();
                    }

                    const position = {
                        x: positionItem.x * gridSize + snakeWaist,
                        y: positionItem.y * gridSize + snakeWaist
                    };

                    createPartOfSnake(this.ctx, position, snakeWaist, rivalSnake.color);
                });
            }
        });
    }

    dispatchGameOver() {
        if (!this.isGameOver) {
            this.snake.setVelocity(0, 0);
            this.isGameOver = true;
            dispatcher('GAME_OVER', { trail: this.snake.trail });
        }
    }
}

const config = {
    gameContainerId: 'game-container',
    gridSize: 10, // grid size
    tileCount: 60, // tile count
    snakeWaist: 5,
};

const game = new Game(config);

setInterval(() => (game.step()), 166);

document.addEventListener('SET_SNAKE', (e) => {
    const payload = e.detail.payload;

    game.setSnake(payload.position, payload.name, payload.color);
});

document.addEventListener('SET_FOOD', (e) => {
    const { foodCoordinate, foodIcon } = e.detail.payload;

    game.setFood(foodCoordinate, foodIcon);
});

document.addEventListener('GET_RIVAL_SNAKES', (e) => {
    game.setRivals(e.detail.payload);
});

document.addEventListener("keydown", (e) => (keyPush(e, game)));

document.addEventListener("click", (e) => (handleClick(e, game)));

document.addEventListener('visibilitychange',
    () => {
        // if (document.hidden) {
        //     console.log('Редирект');
        //     location.href = `/select?name=${game.snake.name}`;
        // }
    },
    false
);
