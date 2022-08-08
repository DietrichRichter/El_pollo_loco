class BottleGround extends MovableObject {
    width = 70;
    height = 70;
    position_y = 360;

    
    constructor(imagePath, position_x) {
        super().loadImage(imagePath);
        this.position_x = position_x;
    }
}