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

export default Food;
