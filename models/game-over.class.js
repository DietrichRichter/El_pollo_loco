class GameOver extends DrawableObject {
    IMAGE = [
        'img/9_intro_outro_screens/game_over/game over!.png',
    ]
    constructor() {
        super().loadImage('img/9_intro_outro_screens/game_over/game over!.png');
        this.loadImages(this.IMAGE);
        this.height = 480;
        this.width = 720;
        this.position_x = 0;
        this.position_y = 0;
    }
}