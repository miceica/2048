// Obtener el contenedor de la cuadrícula
const gridContainer = document.getElementById('grid-container');
// Define una matriz para representar el tablero de juego
let board = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null]
];

// Función para generar una posición aleatoria en el tablero
function getRandomPosition() {
    const row = Math.floor(Math.random() * 4);
    const col = Math.floor(Math.random() * 4);
    return { row, col };
}

// Función para generar fichas en la cuadrícula
function generateTile(row, col, value) {
    // Crea un elemento div para la ficha
    const tile = document.createElement('div');
    tile.classList.add('grid-item');
    tile.textContent = value;
    // Agrega la ficha al contenedor de la cuadrícula
    gridContainer.appendChild(tile);
    // Actualiza la matriz del tablero
    board[row][col] = value;
}

// Función para iniciar el juego
function startGame() {
    // Genera las dos primeras fichas al iniciar el juego
    let pos1 = getRandomPosition();
    let pos2 = getRandomPosition();
    while (pos2.row === pos1.row && pos2.col === pos1.col) {
        // Asegúrate de que las posiciones no sean iguales
        pos2 = getRandomPosition();
    }

    // Genera el resto de las fichas vacías en el tablero
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (row !== pos1.row || col !== pos1.col) {
                if (row !== pos2.row || col !== pos2.col) {
                    // Crea fichas vacías en posiciones vacías
                    generateTile(row, col, "");
                } else {
                    generateTile(pos2.row, pos2.col, Math.random() < 0.9 ? 2 : 4);
                }
            } else {
                generateTile(pos1.row, pos1.col, Math.random() < 0.9 ? 2 : 4);
            }
        }
    }
}

// Iniciar el juego cuando se carga el DOM
document.addEventListener('DOMContentLoaded', startGame);

// Manejador de eventos para el evento 'keydown'
document.addEventListener('keydown', function (event) {
    // Verifica qué tecla se presionó
    switch (event.key) {
        case 'ArrowUp':
            // Mueve los números hacia arriba
            moveUp();
            break;
        case 'ArrowDown':
            // Mueve los números hacia abajo
            moveDown();
            break;
        case 'ArrowLeft':
            // Mueve los números hacia la izquierda
            moveLeft();
            break;
        case 'ArrowRight':
            // Mueve los números hacia la derecha
            moveRight();
            break;
    }
});

function moveUp() {
    for (let col = 0; col < 4; col++) {
        for (let row = 1; row < 4; row++) {
            if (board[row][col] !== null) {
                let newRow = row;
                while (newRow > 0 && (board[newRow - 1][col] === null || board[newRow - 1][col] === board[row][col])) {
                    newRow--;
                }
                if (newRow !== row) {
                    // Mueve el número hacia arriba
                    board[newRow][col] += board[row][col];
                    board[row][col] = null;
                }
            }
        }
    }
    updateBoardView(); // Actualiza la visualización del tablero después del movimiento
}

function moveDown() {
    for (let col = 0; col < 4; col++) {
        for (let row = 2; row >= 0; row--) {
            if (board[row][col] !== null) {
                let newRow = row;
                while (newRow < 3 && (board[newRow + 1][col] === null || board[newRow + 1][col] === board[row][col])) {
                    newRow++;
                }
                if (newRow !== row) {
                    // Mueve el número hacia abajo
                    board[newRow][col] += board[row][col];
                    board[row][col] = null;
                }
            }
        }
    }
    updateBoardView(); // Actualiza la visualización del tablero después del movimiento
}

function moveLeft() {
    for (let col = 1; col < 4; col++) {
        for (let row = 0; row < 4; row++) {
            if (board[row][col] !== null) {
                let newCol = col;
                while (newCol > 0 && (board[row][newCol - 1] === null || board[row][newCol - 1] === board[row][col])) {
                    newCol--;
                }
                if (newCol !== col) {
                    // Mueve el número hacia la izquierda
                    board[row][newCol] += board[row][col];
                    board[row][col] = null;
                }
            }
        }
    }
    updateBoardView(); // Actualiza la visualización del tablero después del movimiento
}


function moveRight() {
    for (let col = 0; col < 4; col++) {
        for (let row = 2; row >= 0; row--) {
            if (board[row][col] !== null) {
                let newCol = col;
                while (newCol < 3 && (board[row][newCol + 1] === null || board[row][newCol + 1] === board[row][col])) {
                    newCol++;
                }
                if (newCol !== col) {
                    // Mueve el número hacia abajo
                    board[row][newCol] += board[row][col];
                    board[row][col] = null;
                }
            }
        }
    }
    updateBoardView(); // Actualiza la visualización del tablero después del movimiento
}

// Función para actualizar la visualización del tablero
function updateBoardView() {
    const gridItems = document.querySelectorAll('.grid-item');
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const index = row * 4 + col;
            const value = board[row][col];
            const gridItem = gridItems[index];
            // Actualiza el contenido del elemento gridItem
            gridItem.textContent = value !== null ? value : ""; // Si value es null, muestra un string vacío en lugar de null
        }
    }
}


