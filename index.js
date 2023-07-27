const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const board = document.getElementById("board");
const cellElements = document.querySelectorAll("[data-cell]");
const winningMessageText = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessage = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
let circleTurn;

startGame();
function startGame() {
  circleTurn = false;
  board.classList.add(X_CLASS);
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    //remove previous listener not to bump memory
    cell.remove(addEventListener("click", handleClick));
  });
  cellElements.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });
}
restartButton.addEventListener("click", () => {
  winningMessage.classList.remove("show");
  startGame();
});

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  //placeMark
  placeMark(cell, currentClass);
  //check For Win
  if (checkWin(currentClass)) {
    endGame(false);
  }
  //Check For Draw
  else if (isDraw()) {
    endGame(true);
  } else {
    //Switch Turns
    swapTurns();
    setBoardHoverClass(currentClass);
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}
function swapTurns() {
  circleTurn = !circleTurn;
}
function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  circleTurn ? board.classList.add(CIRCLE_CLASS) : board.classList.add(X_CLASS);
}
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
function endGame(draw) {
  if (draw) {
    winningMessageText.innerText = `It's a Draw`;
  } else {
    winningMessageText.innerText = `${circleTurn ? "O's" : "X's"} win!`;
  }
  winningMessage.classList.add("show");
}
function isDraw() {
  //destructure cellElements into an array to use every method
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}
