<?php
$rows = 20;
$cols = 40;

$grid = array_fill(0, $rows, array_fill(0, $cols, 0));

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['reset'])) {
        $grid = array_fill(0, $rows, array_fill(0, $cols, 0));
    } else {
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
            <?php for ($i = 0; $i < $rows; $i++): ?>
                <tr>
                    <?php for ($j = 0; $j < $cols; $j++): ?>
                        <td>
                            <input type="checkbox" name="grid[<?php echo $i; ?>][<?php echo $j; ?>]" value="1" <?php echo $grid[$i][$j] ? 'checked' : ''; ?>>
                        </td>
                    <?php endfor; ?>
                </tr>
            <?php endfor; ?>
        </table>
        <button type="submit">Explanation</button>
        <button type="submit" name="next">Next</button>
        <button type="submit" name="reset">Reset Grid</button>
        <button type="button" id="startPauseButton" onclick="toggleStartPause()">Start</button>
        <button type="button" onclick="generateRandomGrid()">Generate Random Grid</button>
        <label for="speedRange">Speed:</label>
        <input type="range" id="speedRange" min="100" max="2000" value="500" step="100" oninput="updateSpeed(this.value)">
        <span id="speedDisplay">500</span> ms
    </form>


    
    <script src="script.js"></script>
</body>
</html>
