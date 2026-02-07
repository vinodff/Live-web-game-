const box = document.getElementById("box");
const gameContainer = document.getElementById("game-container");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const startBtn = document.getElementById("start-btn");

let score = 0;
let timeLeft = 30;
let timerId = null;
let moveIntervalId = null;

function getRandomPosition() {
  const containerRect = gameContainer.getBoundingClientRect();
  const boxSize = 40;

  const maxX = containerRect.width - boxSize;
  const maxY = containerRect.height - boxSize;

  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);

  return { x, y };
}

function moveBox() {
  const pos = getRandomPosition();
  box.style.left = pos.x + "px";
  box.style.top = pos.y + "px";
}

function startGame() {
  // reset state
  score = 0;
  timeLeft = 30;
  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;
  startBtn.disabled = true;
  box.style.display = "block";

  // start moving box every 600ms
  moveBox();
  moveIntervalId = setInterval(moveBox, 600);

  // countdown timer
  timerId = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(timerId);
  clearInterval(moveIntervalId);
  box.style.display = "none";
  startBtn.disabled = false;
  alert("Game over! Your score: " + score);
}

box.addEventListener("click", () => {
  score++;
  scoreEl.textContent = score;
  moveBox(); // move immediately after click
});

startBtn.addEventListener("click", startGame);
