class StatusBarBottle extends DrawableObject {
    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ]
    percentageBottle = 0;


    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.setPercentageBottle(0);
        this.position_x = 0;
        this.position_y = 100;
        this.width = 200;
        this.height = 60;
    }

    setPercentageBottle(percentageBottle) {
        this.percentageBottle = percentageBottle;
        let path = this.IMAGES_BOTTLE[this.resolveImageIndexBottle()];
        this.img = this.imageCache[path];
    }


    resolveImageIndexBottle() {
        if (this.percentageBottle == 100) {
            return 5
        } else if (this.percentageBottle > 80) {
            return 4
        } else if (this.percentageBottle > 60) {
            return 3
        } else if (this.percentageBottle > 40) {
            return 2
        } else if (this.percentageBottle > 20) {
            return 1
        } else {
            return 0
        }
    }
}