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
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ]
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ]
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ]
    position_y = 190;
    world;
    speed = 3;
    offset = {
        top: 120,
        left: 40,
        right: 45,
        bottom: 0,
    }
    AUDIO_WALKING = new Audio('audio/walking.mp3');


    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravitiy();
        this.animate();
        this.endbossAttack();
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
        setStoppableInterval(() => {
            this.stopAudio(this.AUDIO_WALKING);
            if (this.canMoveRight()) {
                this.moveRight();
            }
            if (this.canMoveLeft()) {
                this.moveLeft();
            }
            if (this.canJump()) {
                this.jump();
            }
            if (this.isAboveGround()) {
                this.stopAudio(this.AUDIO_WALKING);
            }
            this.cameraPositionOfCharacter();
        }, 1000 / 60);
    }


    /**
     * Mit dieser Funktion wird die Kamera vom Character fixiert
     */
    cameraPositionOfCharacter() {
        this.world.camera_x = -this.position_x + 50;
    }


    /**
     * Diese Funktion überprüft, ob der Character sich nach rechts bewegen kann
     * @returns gibt die Position vom Character zurück
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.position_x < this.world.level.level_end_x && this.world.lastCollision < 1;
    }


    /**
     * Mit dieser Funktion wird der Character nach rechts bewegt
     */
    moveRight() {
        super.moveRight();
        this.playAudio(this.AUDIO_WALKING);
        this.otherDirection = false;
        if (!this.isAboveGround()) {
        }
    }

    
    /**
     * Diese Funktion überprüft, ob der Character sich nach links bewegen kann
     * @returns gibt die Position vom Character zurück
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.position_x > 0 && this.world.lastCollision < 1;
    }


    /**
     * Mit dieser Funktion wird der Character nach links bewegt
     */
    moveLeft() {
        super.moveLeft();
        this.playAudio(this.AUDIO_WALKING);
        this.otherDirection = true;
        if (!this.isAboveGround()) {
        }
    }


    /**
     * Mit dieser Funktion wird der Character nach oben bewegt
     * @returns gibt die Position vom Character zurück
     */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround() && this.world.lastCollision < 1;
    }


    /**
     * Mit dieser Funktion wird die bewegungsanimation vom Charakter angezeigt
     */
    walkAnimateCharacter() {
        setStoppableInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.canMoveLeftOrRight()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
    }


    /**
     * Mit dieser Funktion wird überprüft, ob die linke oder rechte Taste gedrückt wird
     * @returns gibt die Tasteneingabe zurück
     */
    canMoveLeftOrRight() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    /**
     * Mit dieser Funktion wird eine Animation erst dann ausgeführt, wenn keine tasten gerückt werden
     */
    idelAnimationCharacter() {
        setStoppableInterval(() => {
            if (this.isAKeyNotPressed()) {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 1000);
    }


    /**
     * Diese Funktion überprüft, ob eine Taste gedrückt wird und ob der Character noch am leben ist
     * @returns gibt den Tastendruck zurück
     */
    isAKeyNotPressed() {
        return this.world.keyboard.RIGHT == false && this.world.keyboard.LEFT == false && this.energy > 1;
    }


    /**
     * Mit dieser Funktion wird eine Animation erst dann ausgeführt, wenn eine bestimmte Zeit lang keine Tasten gedrückt werden
     */
    longIdleAnimationCharacter() {
        setStoppableInterval(() => {
            if (this.isAKeyNotPressed()) {
                let lastMoves = this.world.keyboard.lastMove - new Date().getTime();
                if (lastMoves < -5000) {
                    this.playAnimation(this.IMAGES_LONG_IDLE);
                }
            }
        }, 1000);
    }


    /**
     * Mit dieser Funktion wird endbossAttack auf true gesetzt, um die animation von dem Endboss auszuführen
     */
    endbossAttack() {
        setStoppableInterval(() => {
            if (this.position_x > 4100) {
                this.world.level.endboss[0].isEndbossinAttackZone = true;
            } else {
                this.world.level.endboss[0].isEndbossinAttackZone = false;
            }
        }, 100);
    }


    /**
    * Mit dieser Funktion wird ein Sound abgespielt
    * @param {*} sound gibt den Sound zurück
    */
    playAudio(sound) {
        if (this.world.soundOn) {
            sound.play();
        }
    }


    /**
     * Mit dieser Funktion wird ein Sound pausiert
     * @param {*} sound gibt den Sound zurück
     */
    stopAudio(sound) {
        sound.pause();
    }
}