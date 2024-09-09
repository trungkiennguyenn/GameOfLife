<?php
// Define grid size
$rows = 20;
$cols = 40;

// Initialize the grid with dead cells
$grid = array_fill(0, $rows, array_fill(0, $cols, 0));

// Handle form submission to update or reset the grid
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['reset'])) {
        // Reset grid to initial state
        $grid = array_fill(0, $rows, array_fill(0, $cols, 0));
    } else {
        // Update grid with submitted data
        $grid = $_POST['grid'];
    }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Game of Life</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <h1>Conway's Game of Life</h1>

    <form method="POST">
        <table>
            <?php for ($i = 0; $i < $rows; $i++) : ?>
                <tr>
                    <?php for ($j = 0; $j < $cols; $j++) : ?>
                        <td>
                            <input type="checkbox" name="grid[<?php echo $i; ?>][<?php echo $j; ?>]" value="1" <?php echo $grid[$i][$j] ? 'checked' : ''; ?>>
                        </td>
                    <?php endfor; ?>
                </tr>
            <?php endfor; ?>
        </table>
        <button type="button" id="explanationButton">Explanation</button>
        <button type="submit" name="reset">Reset Grid</button>
        <button type="button" id="startPauseButton" onclick="toggleStartPause()">Start</button>
    </form>

    <div id="explanation" class="modal">
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
                <!-- You can add example images like the one shown in the modal image -->
            </div>
        </div>
    </div>
    
    <!-- Zoom Slider -->
    <div class="zoom-slider">
        <label for="zoomRange">Zoom:</label>
        <input type="range" id="zoomRange" min="1" max="3" step="0.1" value="1" oninput="zoomGrid(this.value)">
    </div>
    
    <script src="script.js"></script>
</body>

</html>