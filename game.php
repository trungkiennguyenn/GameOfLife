<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Game of Life</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Conway's Game of Life</h1>
    <canvas id="gameCanvas"></canvas>
        <button type="submit">Explanation</button>
        <button type="submit" name="next">Next</button>
        <button type="submit" name="reset">Reset Grid</button>
        <button type="button" id="startPauseButton" onclick="toggleStartPause()">Start</button>
        <button type="button" onclick="generateRandomGrid()">Generate Random Grid</button>
        <label for="speedRange">Speed:</label>
        <input type="range" id="speedRange" min="100" max="2000" value="500" step="100" oninput="updateSpeed(this.value)">
        <span id="speedDisplay">500</span> ms

    <!-- <div id="explanation" class="modal">
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2>Game of Life Explanation</h2>
            <p>The Game of Life is not your typical computer game. It is a cellular automaton, and was invented by Cambridge mathematician John Conway.</p>
            <p>This game became widely known when it was mentioned in an article published by Scientific American in 1970. It consists of a grid of cells which, based on a few mathematical rules, can live, die, or multiply. Depending on the initial conditions, the cells form various patterns throughout the course of the game.</p>
            <h3>Rules</h3>
            <ul>
                <li><strong>For a space that is populated:</strong></li>
                <li>Each cell with one or no neighbors dies, as if by solitude.</li>
                <li>Each cell with four or more neighbors dies, as if by overpopulation.</li>
                <li>Each cell with two or three neighbors survives.</li>
                <li><strong>For a space that is empty or unpopulated:</strong></li>
                <li>Each cell with three neighbors becomes populated.</li>
            </ul>
            <div class="examples">
            </div>
        </div> -->
    </div>
    <script src="script.js"></script>
</body>

</html>
