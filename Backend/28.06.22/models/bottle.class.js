class Bottle extends MovableObject {
    width = 70;
    height = 70;
    position_y = 260;

    
    constructor() {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.position_x = 200 + Math.random() * 4000;
    }
}