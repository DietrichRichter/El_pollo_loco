class NormalChicken extends MovableObject {
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    width = 60;
    height = 59;
    position_y = 370;


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.position_x = 200 + Math.random() * 4000;
        //this.speed = 0.15 + Math.random() * 0.35;
        this.animate();
    }

    
    /**
    * Mit dieser Funktion wird die Hühnchen animiert. Die einzelnen Bilder werden in einer Endlosschleife angezeigt
    */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}