class BottleGround extends MovableObject {
    width = 70;
    height = 70;
    position_y = 360;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }

    
    constructor(imagePath, position_x) {
        super().loadImage(imagePath);
        this.position_x = position_x;
    }
}