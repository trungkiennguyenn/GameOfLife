let intervalId = null;
let isRunning = false;

function toggleStartPause() {
    var startPauseButton = document.getElementById("startPauseButton");
    if (isRunning) {
        clearInterval(intervalId);
        startPauseButton.textContent = "Start";
        isRunning = false;
    } else {
        intervalId = setInterval(runGameOfLife, 500);
        startPauseButton.textContent = "Pause";
        isRunning = true;
    }
}

function runGameOfLife() {
    const table = document.querySelector('table');
    const grid = getGridFromTable(table);
    const newGrid = calculateNextGeneration(grid);
    updateTableFromGrid(table, newGrid);
}

function getGridFromTable(table) {
    const grid = [];
    const rows = table.rows.length;
    const cols = table.rows[0].cells.length;

    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            const cell = table.rows[i].cells[j].querySelector('input[type="checkbox"]');
            row.push(cell.checked ? 1 : 0);
        }
        grid.push(row);
    }

    return grid;
}

function updateTableFromGrid(table, grid) {
    const rows = table.rows.length;
    const cols = table.rows[0].cells.length;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = table.rows[i].cells[j].querySelector('input[type="checkbox"]');
            cell.checked = grid[i][j] === 1;
        }
    }
}

function calculateNextGeneration(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const newGrid = Array.from(Array(rows), () => Array(cols).fill(0));

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const liveNeighbors = countLiveNeighbors(grid, i, j);
            if (grid[i][j] === 1) {
                if (liveNeighbors < 2 || liveNeighbors > 3) {
                    newGrid[i][j] = 0;
                } else {
                    newGrid[i][j] = 1; 
                }
            } else {
                if (liveNeighbors === 3) {
                    newGrid[i][j] = 1; 
                }
            }
        }
    }

    return newGrid;
}

function countLiveNeighbors(grid, x, y) {
    const rows = grid.length;
    const cols = grid[0].length;
    let liveNeighbors = 0;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const newX = x + i;
            const newY = y + j;
            if (newX >= 0 && newX < rows && newY >= 0 && newY < cols) {
                liveNeighbors += grid[newX][newY];
            }
        }
    }

    return liveNeighbors;
}

function generateRandomGrid() {
    const table = document.querySelector('table');
    const rows = table.rows.length;
    const cols = table.rows[0].cells.length;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = table.rows[i].cells[j].querySelector('input[type="checkbox"]');
            const randomValue = Math.random() > 0.5 ? 1 : 0;
            cell.checked = randomValue === 1;
        }
    }
}

let speed = 500;

function updateSpeed(newSpeed) {
    speed = parseInt(newSpeed);
    document.getElementById('speedDisplay').textContent = newSpeed;
    if (isRunning) {
        clearInterval(intervalId);
        intervalId = setInterval(runGameOfLife, speed);
    }
}

function toggleStartPause() {
    var startPauseButton = document.getElementById("startPauseButton");
    if (isRunning) {
        clearInterval(intervalId);
        startPauseButton.textContent = "Start";
        isRunning = false;
    } else {
        intervalId = setInterval(runGameOfLife, speed);
        startPauseButton.textContent = "Pause";
        isRunning = true;
    }
}
