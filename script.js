const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

const board = document.getElementById("board");
const keyboard = document.getElementById("keyboard");

let currentRow = 0;
let currentGuess = "";

for (let r = 0; r < MAX_GUESSES; r++) {
  const row = document.createElement("div");
  row.className = "row";
  for (let c = 0; c < WORD_LENGTH; c++) {
    const tile = document.createElement("div");
    tile.className = "tile"
    tile.id = `tile-${r}-${c}`;
    row.appendChild(tile);
  }
  board.appendChild(row);
}

const keys = keyboard.querySelectorAll(".key");
keys.forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.key;
    handleKey(key);
  });
});

function handleKey(key) {
  if (key === "ENTER") {
    // Coming in Handout 06
    return;
  }
  if (key === "BACKSPACE") {
    // Coming in Handout 06
    return;
  }
  if (currentGuess.length < WORD_LENGTH) {
    currentGuess = currentGuess + key;
    updateRow();
  }
}

function updateRow() {
  for (let c = 0; c < WORD_LENGTH; c++) {
    const tile = document.getElementById(`tile-${currentRow}-${c}`);
    tile.textContent = currentGuess[c] || "";
  }
}