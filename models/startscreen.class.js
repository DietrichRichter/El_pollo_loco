class Startscreen extends DrawableObject {
    IMAGE = [
        'img/9_intro_outro_screens/start/startscreen_1.png'
    ]

    constructor() {
        super().loadImage('img/9_intro_outro_screens/start/startscreen_1.png');
        this.loadImages(this.IMAGE);
        this.height = 480;
        this.width = 720;
        this.position_x = 0;
        this.position_y = 0;
        //this.showStartButton();
    }

    showStartButton() {
        let button = document.getElementById('start-game-container');
        button.classList.remove('d-none');
        button.innerHTML += `
        <button onclick="startGame()" class="start-game-button">Start Game</button>`;
    }
}