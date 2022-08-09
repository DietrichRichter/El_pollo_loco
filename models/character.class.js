class Character extends MovableObject {
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    position_y = 190;
    world;
    speed = 20;


    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING)
        this.loadImages(this.IMAGES_IDLE)
        this.loadImages(this.IMAGES_LONG_IDLE)
        this.animate();
    }


    /**
     * Mit dieser Funktion wird der Character animiert. Die einzelnen Bilder werden in einer Endlosschleife angezeigt
     */
    animate() {
        this.movePositionCharacter();
        this.walkAnimateCharacter();
        this.idelAnimationCharacter();
        this.longIdleAnimationCharacter();
    }


    /**
     * Mit dieser Funktion wird der Charakter auf dem Canvas bewegt, der Charakter wird beim umdrehen gespiegelt und zeigt die Grenzen auf dem Canvas an
     */
    movePositionCharacter() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.position_x < this.world.level.level_end_x) {
                this.position_x += this.speed;
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.position_x > 0) {
                this.position_x -= this.speed;
                this.otherDirection = true;
            }
            this.world.camera_x = -this.position_x + 50;
        }, 1000 / 60);
    }


    /**
     * Mit dieser Funktion wird die bewegungsanimation vom Charakter angezeigt
     */
    walkAnimateCharacter() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
    }

    idelAnimationCharacter() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT == false && this.world.keyboard.LEFT == false) {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 1000);
    }


    longIdleAnimationCharacter() {
        debugger;
        let lastMove = this.world.keyboard.lastMove - new Date().getTime();
        if(lastMove > 3) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
        }
    }


    /**
     * Mit dieser Funktion wird der Befehl Springen ausgeführt
     */
    jump() {

    }
}