let canvas;
let world;
let keyboard = new Keyboard();
let intervallIds = [];
let loadingScreenTime = [];


/**
 * Diese Funktion wird nachdem das HTML geladen wurde, ausgeführt
 */
function init() {
    canvas = document.getElementById('canvas');
    TouchButtons();
}


/**
 * Mit dieser Funktion wird das Spiel gestartet und der Startscreen/Button wird entfernt
 */
function startGame() {
    initLevel();
    world = new World(canvas, keyboard);
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('touch.icons').classList.remove('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('controller-on').classList.add('d-none');
    document.getElementById('controller-off').classList.add('d-none');
    document.getElementById('controller-info').classList.add('d-none');
    loadingScreen();
}


/**
 * Mit dieser Funktion wird der Ladescreen angezeigt
 */
function loadingScreen() {
    document.getElementById('loading-screen').classList.remove('d-none');
    setInterval(() => {
        loadingScreenTime.push(1);
        if (loadingScreenTime.length > 5) {
            document.getElementById('loading-screen').classList.add('d-none');
        }
    }, 1000);
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
 * Mit dieser Funktion wird der Sound Icon on angezeigt
 */
function soundOff() {
    document.getElementById('sound-off').classList.add('d-none');
    document.getElementById('sound-on').classList.remove('d-none');
}


/**
 * Mit dieser Funktion wird der Sound Icon off angezeigt
 */
function soundOn() {
    document.getElementById('sound-on').classList.add('d-none');
    document.getElementById('sound-off').classList.remove('d-none');
}


/**
 * Mit dieser Funktion wird der Controller Icon angezeigt
 */
function showControllerInfo() {
    document.getElementById('controller-info').classList.remove('d-none');
    document.getElementById('controller-off').classList.remove('d-none');
    document.getElementById('controller-on').classList.add('d-none');
}


/**
 * Mit dieser Funktion wird der Controller Icon angezeigt
 */
function closeControllerInfo() {
    document.getElementById('controller-info').classList.add('d-none');
    document.getElementById('controller-off').classList.add('d-none');
    document.getElementById('controller-on').classList.remove('d-none');
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


/**
 * Mit dieser Funktion wurden die Touch-Buttons hinzugefügt
 */
function TouchButtons() {
    document.getElementById('button-left').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('button-left').addEventListener('touchend', (event) => {
        keyboard.LEFT = false;
    });

    document.getElementById('button-right').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('button-right').addEventListener('touchend', (event) => {
        keyboard.RIGHT = false;
    });

    document.getElementById('button-up').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('button-up').addEventListener('touchend', (event) => {
        keyboard.SPACE = false;
    });

    document.getElementById('button-throw').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.D = true;
    });

    document.getElementById('button-throw').addEventListener('touchend', (event) => {
        keyboard.D = false;
    });
}