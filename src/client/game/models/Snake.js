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

export default Snake;
