const PLAYER_X = 'X';
const PLAYER_O = 'O';
let currentPlayer = PLAYER_X;
let isGameActive = true;
const buttons = document.querySelectorAll('.btn');
const resultContainer = document.querySelector('.result');
const resetButton = document.getElementById('reset-btn');
function handleButtonClick(event) {
    const button = event.target;
    if (button.textContent === '' && isGameActive) {
        button.textContent = currentPlayer;
        button.classList.add('filled');
        if (checkWin() || checkDraw()) {
            isGameActive = false;
            resultContainer.textContent = isGameActive ? `Player ${currentPlayer}'s Turn` : 'Game Over';
        } else {
            currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
            resultContainer.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }
}
function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (buttons[a].textContent && buttons[a].textContent === buttons[b].textContent && buttons[a].textContent === buttons[c].textContent) {
            resultContainer.textContent = `Player ${currentPlayer} Wins!`;
            return true;
        }
    }

    return false;
}

function checkDraw() {
    const isDraw = [...buttons].every(button => button.textContent !== '');
    if (isDraw) {
        resultContainer.textContent = 'It\'s a Draw!';
        return true;
    }
    return false;
}
function resetGame() {
    buttons.forEach(button => {
        button.textContent = '';
        button.classList.remove('filled');
    });

    currentPlayer = PLAYER_X;
    isGameActive = true;
    resultContainer.textContent = `Player ${currentPlayer}'s Turn`;
}
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});
resetButton.addEventListener('click', resetGame);