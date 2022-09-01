class StatusBarCoin extends DrawableObject {
    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ]
    percentageCoin = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN);
        this.setPercentageCoin(0);
        this.position_x = 0;
        this.position_y = 100;
        this.width = 200;
        this.height = 60;
    }


    /**
     * Mit dieser Funktion wird herausgefunden, wie viel Prozent die percentageCoin hat und das passende Bild wird geladen
     * @param {*} percentageCoin gibt den Prozentwert zurück
     */
    setPercentageCoin(percentageCoin) {
        this.percentageCoin = percentageCoin;
        let path = this.IMAGES_COIN[this.resolveImageIndexCoin()];
        this.img = this.imageCache[path];
    }


    /**
     * Mit dieser Funktion werden die einzelnen Bilder anhand der percentageCoin zurückgegeben
     * @returns das Bild zu den Prozenten wird zurückgegeben 
     */
    resolveImageIndexCoin() {
        if (this.percentageCoin == 100) {
            return 5
        } else if (this.percentageCoin > 80) {
            return 4
        } else if (this.percentageCoin > 60) {
            return 3
        } else if (this.percentageCoin > 40) {
            return 2
        } else if (this.percentageCoin > 20) {
            return 1
        } else {
            return 0
        }
    }
}