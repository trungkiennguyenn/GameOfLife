const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let gridSize = 20; // The size of each cell
let zoom = 1; // The zoom level
let offsetX = 0,
    offsetY = 0; // The offset for panning
let isDragging = false;
let startX, startY;

// Set up canvas size - define a specific width and height for the canvas
canvas.width = 800; // Fixed width (you can adjust this)
canvas.height = 600; // Fixed height (you can adjust this)

// Zoom in and out functionality
canvas.addEventListener("wheel", (event) => {
    event.preventDefault();
    const scaleAmount = -event.deltaY * 0.001; // Zoom sensitivity

    // Get the mouse position relative to the canvas
    const mouseX = event.clientX - canvas.offsetLeft;
    const mouseY = event.clientY - canvas.offsetTop;

    // Calculate new zoom
    const newZoom = zoom + scaleAmount;

    // Apply zoom only if within reasonable range
    if (newZoom > 0.1 && newZoom < 5) {
        // Adjust the offset to zoom around the mouse pointer
        offsetX = (mouseX - offsetX) * (newZoom / zoom) + offsetX;
        offsetY = (mouseY - offsetY) * (newZoom / zoom) + offsetY;

        zoom = newZoom;
        drawGrid();
    }
});

// Drawing the grid with respect to zoom and pan
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    ctx.strokeStyle = "#555"; // Grid line color

    const cols = Math.ceil(canvas.width / (gridSize * zoom));
    const rows = Math.ceil(canvas.height / (gridSize * zoom));

    for (let col = -1; col <= cols; col++) {
        for (let row = -1; row <= rows; row++) {
            const x = col * gridSize * zoom + (offsetX % (gridSize * zoom));
            const y = row * gridSize * zoom + (offsetY % (gridSize * zoom));
            ctx.strokeRect(x, y, gridSize * zoom, gridSize * zoom);
        }
    }
}

// Mouse down event for dragging
canvas.addEventListener("mousedown", (event) => {
    isDragging = true;
    startX = event.clientX - offsetX;
    startY = event.clientY - offsetY;
});

// Mouse move event for dragging
canvas.addEventListener("mousemove", (event) => {
    if (isDragging) {
        offsetX = event.clientX - startX;
        offsetY = event.clientY - startY;
        drawGrid();
    }
});

// Mouse up event to stop dragging
canvas.addEventListener("mouseup", () => {
    isDragging = false;
});

// Prevent dragging outside the canvas area
canvas.addEventListener("mouseleave", () => {
    isDragging = false;
});

// Draw the initial grid
drawGrid();
