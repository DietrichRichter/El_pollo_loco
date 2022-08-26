class IntervallIds {
    intervallIds = [];

    setStoppableInterval(fn, time) {
        let id = setInterval(fn, time);
        intervallIds.push(id);
    }
    
    stopGame() {
        intervallIds.forEach(clearInterval);
    }
}