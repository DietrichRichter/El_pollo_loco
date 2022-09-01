let canvas;
let world;
let keyboard = new Keyboard();
let intervallIds = [];

/**
 * Diese Funktion wird nachdem das HTML geladen wurde, ausgeführt
 */
function init() {
    canvas = document.getElementById('canvas');
    
}


/**
 * Mit dieser Funktion wird das Spiel gestartet und der Startscreen/Button wird entfernt
 */
function startGame() {
    initLevel();
    world = new World(canvas, keyboard);
    document.getElementById('start-game-container').classList.add('d-none');
    document.getElementById('start-screen').classList.add('d-none');
}


/**
 * Mit dieser Funktion werden die Ids von den Intervalle in ein Array gepusht
 * @param {*} fn gibt die Funktion von den Intervallen zurück
 * @param {*} time gibt die Zeit von den Intervallen zurück
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervallIds.push(id);
}


/**
 * Mit dieser Funktion werden die Intervalle gestoppt
 */
function stopGame() {
    intervallIds.forEach(clearInterval);
}


/**
 * Mit dieser Funktion wird der HTML Code neu geladen
 */
function restartGame() {
    window.location.reload();
}


/**
 * Mit dieser Funktion wird erkannt, wann eine Taste gedrückt wird
 */
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
        keyboard.lastMove = new Date().getTime();
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
        keyboard.lastMove = new Date().getTime();
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
        keyboard.lastMove = new Date().getTime();
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
        keyboard.lastMove = new Date().getTime();
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
        keyboard.lastMove = new Date().getTime();
    }
});


/**
 * Mit dieser Funktion wird erkannt, wann eine Taste losgelassen wird
 */
window.addEventListener('keyup', (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
        keyboard.lastMove = new Date().getTime();
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
        keyboard.lastMove = new Date().getTime();
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
        keyboard.lastMove = new Date().getTime();
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
        keyboard.lastMove = new Date().getTime();
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
        keyboard.lastMove = new Date().getTime();
    }
});