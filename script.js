// JavaScript to toggle the Start/Pause button text
function toggleStartPause() {
    var startPauseButton = document.getElementById("startPauseButton");
    if (startPauseButton.textContent === "Start") {
        startPauseButton.textContent = "Pause";
        // Start the simulation here (call your simulation function)
    } else {
        startPauseButton.textContent = "Start";
        // Pause the simulation here
    }
}

// JavaScript to toggle the Start/Pause button text
function toggleStartPause() {
    var startPauseButton = document.getElementById("startPauseButton");
    if (startPauseButton.textContent === "Start") {
        startPauseButton.textContent = "Pause";
        // Start the simulation here (call your simulation function)
    } else {
        startPauseButton.textContent = "Start";
        // Pause the simulation here
    }
}

// Zoom grid function
function zoomGrid(value) {
    var gridTable = document.getElementById("gridTable");
    gridTable.style.transform = "scale(" + value + ")";
}
