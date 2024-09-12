<?php
session_start();

$rows = 20;
$cols = 40;

if (!isset($_SESSION['layouts'])) {
    $_SESSION['layouts'] = [];
}

function initializeGrid($rows, $cols) {
    return array_fill(0, $rows, array_fill(0, $cols, 0));
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['reset'])) {
        $grid = initializeGrid($rows, $cols);
    
    } elseif (isset($_POST['save_layout']) && !empty($_POST['layout_name'])) {
        $grid = $_POST['grid'] ?? initializeGrid($rows, $cols);
        $_SESSION['layouts'][$_POST['layout_name']] = $grid;
    
    } elseif (isset($_POST['load_layout']) && !empty($_POST['saved_layout'])) {
        $layout_name = $_POST['saved_layout'];
        $grid = $_SESSION['layouts'][$layout_name] ?? initializeGrid($rows, $cols);
    
    } elseif (isset($_POST['grid'])) {
        $grid = $_POST['grid'];
    
    } else {
        $grid = initializeGrid($rows, $cols);
    }
} else {
    $grid = initializeGrid($rows, $cols);
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
                            <input type="checkbox" name="grid[<?php echo $i; ?>][<?php echo $j; ?>]" value="1" <?php echo isset($grid[$i][$j]) && $grid[$i][$j] ? 'checked' : ''; ?>>
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

        <div>
            <label for="layout_name">Layout Naam:</label>
            <input type="text" name="layout_name" id="layout_name">
            <button type="submit" name="save_layout">Opslaan</button>
        </div>

        <div>
            <label for="saved_layout">Opgeslagen Layouts:</label>
            <select name="saved_layout" id="saved_layout">
                <option value="">Selecteer layout</option>
                <?php foreach ($_SESSION['layouts'] as $name => $layout): ?>
                    <option value="<?php echo htmlspecialchars($name); ?>"><?php echo htmlspecialchars($name); ?></option>
                <?php endforeach; ?>
            </select>
            <button type="submit" name="load_layout">Laad Layout</button>
        </div>
    </form>
    
    <script src="script.js"></script>
</body>
</html>