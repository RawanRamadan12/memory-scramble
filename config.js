// config.js
function getConfig() {
  return {
    rows: parseInt(document.getElementById('rows').value),
    cols: parseInt(document.getElementById('cols').value),
    timeLimit: parseInt(document.getElementById('timeLimit').value)
  };
}

function validateConfig(rows, cols) {
  if ((rows * cols) % 2 !== 0) {
    alert("Board size (rows × columns) must be even!");
    return false;
  }

  if (rows < 2 || cols < 2) {
    alert("Minimum board size is 2×2");
    return false;
  }

  return true;
}