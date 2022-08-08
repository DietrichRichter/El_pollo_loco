class Cloud extends MovableObject {
    width = 484;
    height = 236;
    position_y = 50;


    constructor(imagePath) {
        super().loadImage(imagePath);
        this.position_x = Math.random() * 5500;
        this.speed = 0.15;
        this.animate();
    }

    
    /**
     * Mit dieser Funktion werden die Wolken animiert
     */
    animate() {
        this.moveLeft();
    }
}