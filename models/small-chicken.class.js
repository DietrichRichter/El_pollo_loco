class SmallChicken extends MovableObject {
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    width = 57;
    height = 52;
    position_y = 378;
    offset = {
        top: -10,
        left: 0,
        right: 0,
        bottom: 0,
    }


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.position_x =  200 + Math.random() * 4000;
        this.speed =  0.15 + Math.random() * 0.35;
        this.animate();
    }

    
    /**
    * Mit dieser Funktion wird die Hühnchen animiert. Die einzelnen Bilder werden in einer Endlosschleife angezeigt
    */
    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}