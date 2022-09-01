class Cloud extends MovableObject {
    width = 484;
    height = 236;
    position_y = 50;


    constructor(imagePath, position_x) {
        super().loadImage(imagePath);
        this.position_x = position_x;
        this.speed = 0.05;
        this.animate();
    }

    
    /**
     * Mit dieser Funktion werden die Wolken animiert
     */
    animate() {
        setStoppableInterval(() => {
            this.moveLeft();  
        }, 1000 / 60);
    }
}