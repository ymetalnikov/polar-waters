import Snake from './models/Snake';
import Food from './models/Food';

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

class Game {

    constructor(config, dispatcher) {
        this.config = Object.assign({}, config);
        const { gameContainerId, gridSize, tileCount } = this.config;
        const { canvas, ctx } = createCanvas(gameContainerId, gridSize * tileCount);

        this.canvas = canvas;
        this.ctx = ctx;

        this.snake = undefined;
        this.food = undefined;
        this.isNewFood = false;
        this.rivals = [];
        this.dispatcher = dispatcher;
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

    setFood(newPosition, icon) {
        if (!newPosition || !icon) {
            return
        }

        const isFood = !!this.food;

        if (!isFood) {
            this.food = new Food({ x: newPosition.x, y: newPosition.y }, icon);
            this.isNewFood = true;
        } else {
            const { x, y } = this.food.position;

            if ((x !== newPosition.x) && (y !== newPosition.y)) {
                this.food = new Food({ x: newPosition.x, y: newPosition.y }, icon);
                this.isNewFood = true;
            }
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

        if (this.food && !this.food.isEaten) {
            const { x, y } = this.food.getPosition();

            if (
                (x === newPosition.x || x + 1 === newPosition.x )
                && (y === newPosition.y || y + 1 === newPosition.y)
            ) {
                this.snake.tail += 1;
                this.food.isEaten = true;
                this.dispatcher('SET_FOOD_EATEN', this.snake.trail);
            }
        }

        this.dispatcher('SET_SNAKE_MOTION', this.snake.trail);
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
        if (!this.food || this.food.isEaten) {
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
            this.dispatcher('GAME_OVER', { trail: this.snake.trail });
        }
    }
}

export default Game;
