let canvas;
let world;
let keyboard = new Keyboard();

/**
 * Diese Funktion wird nachdem das HTML geladen wurde, ausgeführt
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
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
});