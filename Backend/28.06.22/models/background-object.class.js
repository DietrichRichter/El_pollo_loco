class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    
    constructor(imagePath, position_x) {
        super().loadImage(imagePath);
        this.position_x = position_x;
        this.position_y = 480 - this.height;
    }
}