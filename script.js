'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const player2El = document.querySelector('.player--2');
const score0El = document.getElementById('score--0');
const score1El = document.querySelector('#score--1');
const score2El = document.getElementById('score--2');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const current2El = document.querySelector('#current--2');
const diceEl = document.querySelector('.dice');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');

let score, currentScore, activepla, playing;

const reseting = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  score2El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  current2El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player2El.classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player2El.classList.remove('player--active');
  score = [0, 0, 0];
  currentScore = 0;
  activepla = 0;
  playing = true;
};
reseting();
const switchpla = function () {
  document.querySelector(`#current--${activepla}`).textContent = 0;
  currentScore = 0;
  if (activepla === 0) {
    activepla = 1;
    player1El.classList.toggle('player--active');
    player0El.classList.remove('player--active');
    player2El.classList.remove('player--active');
  } else if (activepla === 1) {
    activepla = 2;
    player2El.classList.toggle('player--active');
    player0El.classList.remove('player--active');
    player1El.classList.remove('player--active');
  } else if (activepla === 2) {
    activepla = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.remove('player--active');
    player2El.classList.remove('player--active');
  }
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activepla}`).textContent =
        currentScore;
      if (currentScore >= 20) {
        playing = false;
        document
          .querySelector(`.player--${activepla}`)
          .classList.add('player--winner');
        document.querySelector(`#score--${activepla}`).textContent =
          currentScore;
      }
    } else {
      switchpla();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    score[activepla] += currentScore;
    document.querySelector(`#score--${activepla}`).textContent =
      score[activepla];
    if (score[activepla] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activepla}`)
        .classList.add('player--winner');
    } else {
      switchpla();
    }
  }
});

btnNew.addEventListener('click', reseting);
