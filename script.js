const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

const target = WORDS[Math.floor(Math.random() * WORDS.length)];
console.log("(cheat) target word:", target);

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
  if (currentRow >= MAX_GUESSES) return;

  if (key === "ENTER") {
    if (currentGuess.length !== WORD_LENGTH) {
      alert("Not enough letters!");

      const rowEl = board.children[currentRow];
      rowEl.classList.add("shake");
      setTimeout(() => rowEl.classList.remove("shake"), 300);

      return;
    }
    const result = scoreGuess(currentGuess, target);
    revealRow(currentRow, result);
    currentRow = currentRow + 1;
    currentGuess = "";
    return;
  }
  if (key === "BACKSPACE") {
    currentGuess = currentGuess.slice(0, -1);
    updateRow();
    return;
  }
  if (currentGuess.length < WORD_LENGTH) {
    currentGuess = currentGuess + key;
    console.log(currentGuess)
    updateRow();
  }
}
function updateRow() {
  for (let c = 0; c < WORD_LENGTH; c++) {
    const tile = document.getElementById(`tile-${currentRow}-${c}`);
    tile.textContent = currentGuess[c] || "";
  }
}
function scoreGuess(guess, target) {
  const result = new Array(WORD_LENGTH).fill("absent");
  const targetChars = target.split("");
  const guessChars = guess.split("");

  for (let i = 0; i <WORD_LENGTH; i++) {
    if (guessChars[i] === targetChars[i]){
      result[i] = "correct";
      targetChars[i] = null;
    }
  }

  for (let i = 0; i <WORD_LENGTH; i++) {
    if (result[i] === "correct") continue;
    const foundAt = targetChars.indexOf(guessChars[i]);
    if (foundAt !== -1) {
      result[i] = "present";
      targetChars [foundAt] = null;
    }
  }

  return result;
}

function revealRow(rowIndex, result) {
  for (let c = 0; c < WORD_LENGTH; c++) {
    const tile = document.getElementById(`tile-${rowIndex}-${c}`);
    tile.classList.add(result[c]);
  }
}

