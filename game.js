// game.js
const ICONS = ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼',
               '🐨','🐯','🦁','🐮','🐷','🐸','🐵','🐔',
               '🐧','🐦','🦆','🦅','🦉','🦇','🐺','🐗'];

let firstCard = null, secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let totalPairs = 0;
let timerInterval = null;

function generateBoard(rows, cols) {
  totalPairs = (rows * cols) / 2;
  matchedPairs = 0;
  const selectedIcons = ICONS.slice(0, totalPairs);
  const cardValues = [...selectedIcons, ...selectedIcons];
  
  // Shuffle
  cardValues.sort(() => Math.random() - 0.5);

  const board = document.getElementById('game-board');
  board.innerHTML = '';
  board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

  cardValues.forEach((icon, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = icon;
    card.dataset.index = index;
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">❓</div>
        <div class="card-back">${icon}</div>
      </div>`;
    card.addEventListener('click', () => flipCard(card));
    board.appendChild(card);
  });
}

function flipCard(card) {
  if (lockBoard || card.classList.contains('flipped') || card.classList.contains('matched')) return;
  card.classList.add('flipped');

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  lockBoard = true;
  checkMatch();
}

function checkMatch() {
  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedPairs++;
    resetTurn();
    if (matchedPairs === totalPairs) winGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function winGame() {
  clearInterval(timerInterval);
  setTimeout(() => alert("🎉 You Win! All pairs matched!"), 300);
}
function startTimer(seconds) {
  let remaining = seconds;
  const display = document.getElementById('timer');
  display.textContent = ⏱️ ${remaining}s;

  timerInterval = setInterval(() => {
    remaining--;
    display.textContent = ⏱️ ${remaining}s;
    if (remaining <= 0) {
      clearInterval(timerInterval);
      gameOver();
    }
  }, 1000);
}

function gameOver() {
  // Flip all cards face-down and show game over message
  document.querySelectorAll('.card').forEach(c => c.classList.remove('flipped'));
  document.getElementById('message').textContent = "💀 Game Over! Time's up!";
  document.getElementById('message').style.display = 'block';
  document.getElementById('game-board').style.pointerEvents = 'none';
}

function startGame() {
  clearInterval(timerInterval);
  document.getElementById('message').style.display = 'none';
  const { rows, cols, timeLimit } = getConfig();
  if (!validateConfig(rows, cols)) return;
  generateBoard(rows, cols);
  startTimer(timeLimit);
}