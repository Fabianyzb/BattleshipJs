let gameBoard = [
  [1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
];

let shipsVisible = true;

document.addEventListener("DOMContentLoaded", () => {
  const gameBoardElement = document.getElementById("game-board");
  const toggleShipsBtn = document.getElementById("toggle-ships-btn");
  const fireButton = document.getElementById("fire-button");
  const fireInput = document.getElementById("fire-input");
  const fireSubmitButton = document.getElementById("fire-submit-button");

  toggleShipsBtn.addEventListener("click", toggleShipsVisibility);
  fireButton.addEventListener("click", () => {
    fireInput.style.display = "block";
  });
  fireSubmitButton.addEventListener("click", () => {
    const coordinateInput = document
      .getElementById("coordinate-input")
      .value.toUpperCase();

    // Obtener las coordenadas de fila y columna
    const rowChar = coordinateInput.charAt(0);
    const colNum = parseInt(coordinateInput.substring(1)) - 1; // Restar 1 para obtener el índice base cero

    // Convertir la letra de fila a un índice numérico (A=0, B=1, etc.)
    const row = rowChar.charCodeAt(0) - "A".charCodeAt(0);

    // Validar las coordenadas
    if (row >= 0 && row < 10 && colNum >= 0 && colNum < 10) {
      fireTorpedo(row, colNum);
    } else {
      console.log("Coordenadas inválidas");
    }

    fireInput.style.display = "none";
  });

  // Generar etiquetas de coordenadas
  const rowCoordinates = document.querySelector(".row-coordinates");
  const colCoordinates = document.querySelector(".col-coordinates");
  for (let i = 0; i < 10; i++) {
    const rowDiv = document.createElement("div");
    rowDiv.textContent = String.fromCharCode(65 + i);
    rowCoordinates.appendChild(rowDiv);

    const colDiv = document.createElement("div");
    colDiv.textContent = i + 1;
    colCoordinates.appendChild(colDiv);
  }

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cellElement = document.createElement("div");
      cellElement.className = "cell";
      cellElement.dataset.coordinate = String.fromCharCode(65 + i) + (j + 1);
      cellElement.addEventListener("click", () => fireTorpedo(i, j));
      gameBoardElement.appendChild(cellElement);
    }
  }

  renderBoard();
});

function fireTorpedo(row, col) {
  const cellValue = gameBoard[row][col];
  const cellElement = document.getElementsByClassName("cell")[row * 10 + col];

  if (cellValue === 1) {
    gameBoard[row][col] = 2; // Mark as hit
    cellElement.classList.add("hit");
  } else {
    gameBoard[row][col] = 3; // Mark as missed
    cellElement.classList.add("miss");
  }

  renderBoard();
}

function renderBoard() {
  const cells = document.getElementsByClassName("cell");

  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard[i].length; j++) {
      const index = i * 10 + j;
      const cellElement = cells[index];

      cellElement.className = "cell";

      // Añadir coordenadas a cada celda
      const coordinatesText = String.fromCharCode(65 + i) + (j + 1);
      cellElement.textContent = coordinatesText;

      if (gameBoard[i][j] === 1 && shipsVisible) {
        cellElement.classList.add("ship");
      } else if (gameBoard[i][j] === 2) {
        cellElement.classList.add("hit");
      } else if (gameBoard[i][j] === 3) {
        cellElement.classList.add("miss");
      }
    }
  }
}

function toggleShipsVisibility() {
  shipsVisible = !shipsVisible;
  renderBoard();
}
