class BottleGround extends MovableObject {
    width = 70;
    height = 70;
    position_y = 360;

    
    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.position_x = 200 + Math.random() * 4000;
    }
}