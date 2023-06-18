function closeWindow() {
    window.close();
}

let isDragging = false;
let offset = {
    x: 0,
    y: 0
};

function handleMouseDown(e) {
    isDragging = true;
    offset = {
        x: e.clientX,
        y: e.clientY
    };
}

function handleMouseMove(e) {
    if (!isDragging) return;
    const currentWindow = require('electron').remote.getCurrentWindow();
    const {
        x,
        y
    } = currentWindow.getPosition();
    currentWindow.setPosition(x + e.clientX - offset.x, y + e.clientY - offset.y);
}

function handleMouseUp() {
    isDragging = false;
}