// script.js
const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('game-status');
const restartBtn = document.getElementById('restart-btn');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (gameState[cellIndex] !== '' || !gameActive || currentPlayer === 'O') {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    checkResult();
    if (gameActive) {
        currentPlayer = 'O';
        setTimeout(aiMove, 500);
    }
}

function aiMove() {
    let availableCells = [];
    gameState.forEach((cell, index) => {
        if (cell === '') availableCells.push(index);
    });

    if (availableCells.length > 0) {
        const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        gameState[randomIndex] = 'O';
        cells[randomIndex].textContent = 'O';

        checkResult();
        if (gameActive) {
            currentPlayer = 'X';
            gameStatus.textContent = `It's ${currentPlayer}'s turn`;
        }
    }
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameStatus.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    const roundDraw = !gameState.includes('');
    if (roundDraw) {
        gameStatus.textContent = 'Draw!';
        gameActive = false;
        return;
    }

    if (currentPlayer === 'X') {
        gameStatus.textContent = `It's ${currentPlayer}'s turn`;
    }
}

function restartGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    gameStatus.textContent = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

gameStatus.textContent = `It's ${currentPlayer}'s turn`;
