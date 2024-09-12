let intervalId = null, isRunning = false, isMouseDown = false, toggleState = null;
let speed = 500;

document.addEventListener('mouseup', () => isMouseDown = false);

function toggleStartPause() {
    const btn = document.getElementById("startPauseButton");
    isRunning ? clearInterval(intervalId) : intervalId = setInterval(runGameOfLife, speed);
    btn.textContent = isRunning ? "Start" : "Pause";
    isRunning = !isRunning;
}

function runGameOfLife() {
    const table = document.querySelector('table');
    const grid = getGridFromTable(table);
    updateTableFromGrid(table, calculateNextGeneration(grid));
}

function getGridFromTable(table) {
    return Array.from(table.rows, row => Array.from(row.cells, cell => cell.querySelector('input').checked ? 1 : 0));
}

function updateTableFromGrid(table, grid) {
    grid.forEach((row, i) => row.forEach((val, j) => table.rows[i].cells[j].querySelector('input').checked = val === 1));
}

function calculateNextGeneration(grid) {
    return grid.map((row, i) => row.map((cell, j) => {
        const liveNeighbors = countLiveNeighbors(grid, i, j);
        return (cell && liveNeighbors === 2) || liveNeighbors === 3 ? 1 : 0;
    }));
}

function countLiveNeighbors(grid, x, y) {
    return [-1, 0, 1].reduce((acc, i) => acc + [-1, 0, 1].reduce((subAcc, j) => {
        if (i === 0 && j === 0) return subAcc;
        const newX = x + i, newY = y + j;
        return subAcc + (grid[newX] && grid[newX][newY] ? 1 : 0);
    }, 0), 0);
}

function generateRandomGrid() {
    document.querySelectorAll('input[type="checkbox"]').forEach(cell => cell.checked = Math.random() > 0.5);
}

function updateSpeed(newSpeed) {
    speed = parseInt(newSpeed);
    document.getElementById('speedDisplay').textContent = newSpeed;
    if (isRunning) {
        clearInterval(intervalId);
        intervalId = setInterval(runGameOfLife, speed);
    }
}


function initializeCell(cell) {

    cell.addEventListener('click', () => {
        if (!isMouseDown) {
            toggleState = !cell.checked;
            cell.checked = toggleState;
        }
    });


    cell.addEventListener('mousedown', () => {
        isMouseDown = true;
        toggleState = !cell.checked;
        cell.checked = toggleState;
    });


    cell.addEventListener('mousemove', () => {
        if (isMouseDown) {
            cell.checked = toggleState;
        }
    });
}


document.querySelectorAll('input[type="checkbox"]').forEach(cell => initializeCell(cell));

document.querySelector('button[name="next"]').addEventListener('click', function (event) {
    event.preventDefault();
    runGameOfLife();
});