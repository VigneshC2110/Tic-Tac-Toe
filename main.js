let statusDisplay = document.querySelector('.status');
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let winningConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6]];
let cell=document.querySelectorAll('.cell');
let restart=document.querySelector('.restart');
cell.forEach(cell => cell.addEventListener('click', processCellClick));
restart.addEventListener('click', restartGame);
let clickSound = new Audio('Asset/click.mp3');

let updateStatusMessage = (message, color = "rgb(65, 65, 65)") => {
    statusDisplay.innerHTML = message;
    statusDisplay.style.color = color;
};

updateStatusMessage(`It's ${currentPlayer}'s turn`);

function playCell(cell, index) {
    gameState[index] = currentPlayer;
    cell.innerHTML = currentPlayer;
    clickSound.play();
}

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatusMessage(`It's ${currentPlayer}'s turn`);
}

function validateGameResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        let [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        updateStatusMessage(`Player ${currentPlayer} has won!`, "rgb(251,100,204)");
        gameActive = false;
        return;
    }
    if (!gameState.includes("")) {
        updateStatusMessage("Game ended in a draw!", "rgb(251,100,204)");
        gameActive = false;
        return;
    }

    switchPlayer();
}

function processCellClick(event) {
    let cell = event.target;
    let index = parseInt(cell.getAttribute('data-cell-index'));

    if (gameState[index] || !gameActive) {
        return;
    }
    playCell(cell, index);
    validateGameResult();
}

function restartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    updateStatusMessage(`It's ${currentPlayer}'s turn`);
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

function startBackgroundMusic() {
    let backgroundMusic = document.getElementById('backgroundMusic');
    if (backgroundMusic.paused) {
        backgroundMusic.play()
    }
}

document.body.addEventListener('click', startBackgroundMusic);