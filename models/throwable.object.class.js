class ThrowableObject extends MovableObject {
    IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
    
    constructor(position_x, position_y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES);
        this.width = 70;
        this.height = 70;
        this.position_x = position_x;
        this.position_y = position_y;
        this.animate();
        this.trow();
    }


    /**
     * Mit dieser Funktion wird eine Animation ausgeführt
     */
    animate() {
        setStoppableInterval(() => {
            let i = this.currenImage % this.IMAGES.length;
            let path = this.IMAGES[i];
            this.img = this.imageCache[path];
            this.currenImage++ 
        }, 100);

    }


    /**
     * Mit dieser Funktion wird eine Flasche geworfen und die Flugbahn berechnet
     */
    trow() {
        this.speedY = 20;
        this.applyGravitiy();
        setStoppableInterval(() => {
            this.position_x += 8;
        }, 25);
    }
}