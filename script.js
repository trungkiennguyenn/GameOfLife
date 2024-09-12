const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let gridSize = 20; // The size of each cell
let zoom = 1; // The zoom level
let offsetX = 0,
    offsetY = 0; // The offset for panning
let isDragging = false;
let startX, startY;
let grid = [];
let rows = 1000,
    cols = 1000; // Grid dimensions
let isRunning = false;
let intervalId = null;

// Set up canvas size
canvas.width = 1500;
canvas.height = 600;

// Initialize the grid with empty (0) values
function initializeGrid() {
    grid = Array.from({ length: rows }, () => Array(cols).fill(0));
}

function generateRandomGrid() {
    console.log("Generating random grid..."); // Log when random grid is generated
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = Math.random() > 0.5 ? 1 : 0;
        }
    }
    drawGrid();
    console.log("Grid generated", grid); // Log the grid state to ensure it’s randomized
}



// Calculate the next generation based on Game of Life rules
function calculateNextGeneration() {
    let newGrid = grid.map((arr) => [...arr]);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const liveNeighbors = countLiveNeighbors(i, j);

            if (grid[i][j] === 1) {
                if (liveNeighbors < 2 || liveNeighbors > 3) {
                    newGrid[i][j] = 0;
                }
            } else {
                if (liveNeighbors === 3) {
                    newGrid[i][j] = 1;
                }
            }
        }
    }

    grid = newGrid;
}

// Count live neighbors for a cell
function countLiveNeighbors(x, y) {
    let liveNeighbors = 0;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;

            const row = (x + i + rows) % rows;
            const col = (y + j + cols) % cols;

            liveNeighbors += grid[row][col];
        }
    }

    return liveNeighbors;
}

// Draw the grid and cells on the canvas
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    ctx.strokeStyle = "#555"; // Grid lines color
    ctx.fillStyle = "green"; // Live cells color

    const cellSize = gridSize * zoom;

    // Calculate the range of rows and columns to draw
    const startCol = Math.max(Math.floor(-offsetX / cellSize), 0);
    const endCol = Math.min(
        Math.ceil((canvas.width - offsetX) / cellSize),
        cols
    );
    const startRow = Math.max(Math.floor(-offsetY / cellSize), 0);
    const endRow = Math.min(
        Math.ceil((canvas.height - offsetY) / cellSize),
        rows
    );

    for (let col = startCol; col < endCol; col++) {
        for (let row = startRow; row < endRow; row++) {
            const x = col * cellSize + offsetX;
            const y = row * cellSize + offsetY;

            if (grid[row][col] === 1) {
                ctx.fillRect(x, y, cellSize, cellSize); // Draw live cell
            }
            ctx.strokeRect(x, y, cellSize, cellSize); // Draw grid cell
        }
    }
}





// Toggle start/pause the Game of Life
function toggleStartPause() {
    if (isRunning) {
        clearInterval(intervalId);
        document.getElementById("startPauseButton").textContent = "Start";
        isRunning = false;
    } else {
        intervalId = setInterval(() => {
            calculateNextGeneration();
            drawGrid();
        }, 500); // Adjust speed as needed
        document.getElementById("startPauseButton").textContent = "Pause";
        isRunning = true;
    }
}


// Add click event listener to canvas
canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const col = Math.floor((mouseX - offsetX) / (gridSize * zoom));
    const row = Math.floor((mouseY - offsetY) / (gridSize * zoom));

    console.log(
        `Mouse clicked at (${mouseX}, ${mouseY}), corresponds to grid (${row}, ${col})`
    );

    if (row >= 0 && row < rows && col >= 0 && col < cols) {
        grid[row][col] = grid[row][col] === 1 ? 0 : 1; // Toggle cell state
        console.log(`Toggled cell at (${row}, ${col}) to ${grid[row][col]}`);
        drawGrid();
    } else {
        console.log("Click was outside grid bounds");
    }
});


canvas.addEventListener("wheel", (event) => {
    event.preventDefault();

    const zoomFactor = 1.1;
    const mouseX = event.clientX - canvas.offsetLeft;
    const mouseY = event.clientY - canvas.offsetTop;

    const oldZoom = zoom;
    if (event.deltaY < 0) {
        zoom *= zoomFactor; // Zoom in
    } else {
        zoom /= zoomFactor; // Zoom out
    }

    // Adjust offset so the zoom stays focused on the mouse position
    offsetX = mouseX - ((mouseX - offsetX) / oldZoom) * zoom;
    offsetY = mouseY - ((mouseY - offsetY) / oldZoom) * zoom;

    drawGrid(); // Redraw the grid with updated zoom and offset
});


// Drawing the grid with respect to zoom and pan
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    ctx.strokeStyle = "white"; // Use white for grid lines
    ctx.fillStyle = "green"; // Use bright green for live cells

    for (let col = 0; col < grid[0].length; col++) {
        for (let row = 0; row < grid.length; row++) {
            const x = col * gridSize * zoom + offsetX;
            const y = row * gridSize * zoom + offsetY;

            if (grid[row][col] === 1) {
                ctx.fillRect(x, y, gridSize * zoom, gridSize * zoom); // Fill live cells with green
            }
            ctx.strokeRect(x, y, gridSize * zoom, gridSize * zoom); // Draw white grid lines
        }
    }
}


// Mouse down event for dragging
canvas.addEventListener("mousedown", (event) => {
    isDragging = true;
    const rect = canvas.getBoundingClientRect();
    startX = event.clientX - rect.left - offsetX;
    startY = event.clientY - rect.top - offsetY;
});

// Mouse move event for dragging
canvas.addEventListener("mousemove", (event) => {
    if (isDragging) {
        const rect = canvas.getBoundingClientRect();
        offsetX = event.clientX - rect.left - startX;
        offsetY = event.clientY - rect.top - startY;
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

// Initialize the grid and draw it for the first time
initializeGrid();
drawGrid();
