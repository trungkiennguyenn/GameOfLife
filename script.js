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


// JavaScript to show and hide the explanation modal
document.getElementById("explanationButton").addEventListener("click", function() {
    var explanation = document.getElementById("explanation");
    explanation.style.display = "block";
});

document.querySelector(".close-button").addEventListener("click", function() {
    var explanation = document.getElementById("explanation");
    explanation.style.display = "none";
});

// Close the modal if the user clicks anywhere outside of the modal content
window.onclick = function(event) {
    var modal = document.getElementById("explanation");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
