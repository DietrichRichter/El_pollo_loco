class YouLose extends DrawableObject {
    IMAGE = [
        'img/9_intro_outro_screens/game_over/oh no you lost!.png',
    ]
    constructor() {
        super().loadImage('img/9_intro_outro_screens/game_over/oh no you lost!.png');
        this.loadImages(this.IMAGE);
        this.height = 480;
        this.width = 720;
        this.position_x = 0;
        this.position_y = 0;
    }
}