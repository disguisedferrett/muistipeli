let sequence = [];
let humanSequence = [];
let level = 0;

const startButton = document.querySelector('.js-start');
const info = document.querySelector('.js-info');
const heading = document.querySelector('.js-heading');
const tileContainer = document.querySelector('.js-container');

function humanTurn(level) {
  tileContainer.classList.remove('unclickable');
  info.textContent = `Sinun vuorosi: ${level} Painallus${level > 1 ? 'ta' : ''}`;
}

function activateTile(color) {
  const tile = document.querySelector(`[data-tile='${color}']`);
  const sound = document.querySelector(`[data-sound='${color}']`);

  tile.classList.add('activated');
  sound.play();

  setTimeout(() => {
    tile.classList.remove('activated');
  }, 300);
}

function playRound(nextSequence) {
  nextSequence.forEach((color, index) => {
    setTimeout(() => {
      activateTile(color);
    }, (index + 1) * 600);
  });
}

function nextStep() {
  const tiles = ['red', 'green', 'blue', 'yellow'];
  const random = tiles[Math.floor(Math.random() * tiles.length)];

  return random;
}

function nextRound() {
  level += 1;


  tileContainer.classList.add('unclickable');

  info.textContent = 'Odota tietokonetta...';

  heading.textContent = `Taso ${level}/20`;


  const nextSequence = [...sequence];
  nextSequence.push(nextStep());
  playRound(nextSequence);

  sequence = [...nextSequence];
  setTimeout(() => {
    humanTurn(level);
  }, level * 600 + 1000);
}

function handleClick(tile) {
  const index = humanSequence.push(tile) - 1;
  const sound = document.querySelector(`[data-sound='${tile}']`);
  sound.play();

  const remainingTaps = sequence.length - humanSequence.length;

  if (humanSequence.length === sequence.length) {
    humanSequence = [];
    info.textContent = 'Hyvä! Jatka samaan malliin!';
    setTimeout(() => {
      nextRound();
    }, 1000);
    return;
  }

  info.textContent = `Sinun vuorosi: ${remainingTaps} Painallus${
    remainingTaps > 1 ? 'ta' : ''
  }`;
}

function startGame() {
  startButton.classList.add('hidden');
  info.classList.remove('hidden');
  info.textContent = 'Odota tietokonetta...';
  nextRound();
}

startButton.addEventListener('click', startGame);
tileContainer.addEventListener('click', event => {
  const { tile } = event.target.dataset;

  if (tile) handleClick(tile);
});