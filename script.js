const boardSize = 5;
let board = [];

function toggle(row, col) {
    if (row < 0 || row >= boardSize || col < 0 || col >= boardSize) return;
    board[row][col].classList.toggle("is-off");
}

function handleClick(row, col) {
    toggle(row, col);
    toggle(row - 1, col);
    toggle(row + 1, col);
    toggle(row, col - 1);
    toggle(row, col + 1);
    checkWin();
}

function checkWin() {
    const allOff = board.flat().every(cell => cell.classList.contains("is-off"));
    if (allOff) {
        setTimeout(() => alert("You win!"), 100);
    }
}

function randomizeBoard(moves = 15) {
    for (let i = 0; i < moves; i++) {
        const row = Math.floor(Math.random() * boardSize);
        const col = Math.floor(Math.random() * boardSize);
        toggle(row, col);
        toggle(row - 1, col);
        toggle(row + 1, col);
        toggle(row, col - 1);
        toggle(row, col + 1);
    }
}

function createBoard() {
    const container = document.getElementById("game-board");
    container.innerHTML = "";
    board = [];

    for (let row = 0; row < boardSize; row++) {
        const rowArray = [];
        for (let col = 0; col < boardSize; col++) {
            const square = document.createElement("div");
            square.className = "square";
            square.addEventListener("click", () => handleClick(row, col));
            container.appendChild(square);
            rowArray.push(square);
        }
        board.push(rowArray);
    }

    randomizeBoard();
}

window.onload = createBoard;
