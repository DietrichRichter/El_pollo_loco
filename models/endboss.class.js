class Endboss extends MovableObject {
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ]
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ]
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ]
    width = 230;
    height = 263.5
    position_x = 5000;
    position_y = 175;
    speed = 4;
    attackSpeed = 20;
    world;
    walk = true;
    isEndbossinAttackZone = false;
    endbossEnergy = 100;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }


    /**
    * Mit dieser Funktion wird der Endboss animiert.
    */
    animate() {
        setStoppableInterval(() => {
            if (this.endbossEnergy < 1) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isEndbossinAttackZone) {
                this.playAnimation(this.IMAGES_ATTACK);
                this.attackCharacter();
            } else if (this.position_x < 4500) {
                this.playAnimation(this.IMAGES_ALERT);
            } else if (this.position_x > 4490) {
                this.moveEndbossPosition();
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 250);
    }

    attackCharacter() {
        this.position_x -= this.attackSpeed;
    }

    /**
     * Mit dieser Funktion wird der Endboss bis zu einem bestimmten Punkt bewegt
     */
    moveEndbossPosition() {
        if (this.walk) {
            this.moveLeft();
        }
        if (this.position_x < 4490) {
            this.walk = false;
        }
    }


    /**
     * Mit dieser Funktion wird der Schaden hinzugefügt
     */
    hitEndboss() {
        this.endbossEnergy -= 19.9;
        if (this.endbossEnergy < 0) {
            this.endbossEnergy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }
}