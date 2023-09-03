// Define constants for player symbols
const PLAYER_X = 'X';
const PLAYER_O = 'O';

// Initialize game variables
let currentPlayer = PLAYER_X;
let isGameActive = true;

// Get all the buttons (grid cells)
const buttons = document.querySelectorAll('.btn');

// Get the result container and reset button
const resultContainer = document.querySelector('.result');
const resetButton = document.getElementById('reset-btn');

// Function to handle button click
function handleButtonClick(event) {
    const button = event.target;

    // Check if the button is empty and the game is active
    if (button.textContent === '' && isGameActive) {
        button.textContent = currentPlayer;
        button.classList.add('filled', currentPlayer.toLowerCase());

        // Check for a win or draw
        if (checkWin() || checkDraw()) {
            isGameActive = false;
            resultContainer.textContent = isGameActive ? `Player ${currentPlayer}'s Turn` : 'Game Over';
        } else {
            // Toggle players
            currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
            resultContainer.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }
}

// Function to check for a win
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

// Function to check for a draw
function checkDraw() {
    const isDraw = [...buttons].every(button => button.textContent !== '');
    if (isDraw) {
        resultContainer.textContent = 'It\'s a Draw!';
        return true;
    }
    return false;
}

// Function to reset the game
function resetGame() {
    buttons.forEach(button => {
        button.textContent = '';
        button.classList.remove('filled', 'x', 'o');
    });

    currentPlayer = PLAYER_X;
    isGameActive = true;
    resultContainer.textContent = `Player ${currentPlayer}'s Turn`;
}

// Add click event listeners to the buttons
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

// Add click event listener to the reset button
resetButton.addEventListener('click', resetGame);
