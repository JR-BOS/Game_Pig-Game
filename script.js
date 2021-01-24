'use strict';

//----- Selecting elements -----
let score0 = document.querySelector('#score--0');
let score1 = document.getElementById('score--1'); //does the same thing as above
let current_score0 = document.querySelector('#current--0');
let current_score1 = document.querySelector('#current--1');
const dice_elem = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
let active_player = 0;
const score = [0, 0];
let current_score = 0;
let game_status = true;

//----- Starting Conditions -----
score0.textContent = 0;
score1.textContent = 0;
dice_elem.classList.add('hidden');

function switchPlayer() {
  current_score = 0;
  document.getElementById(
    `current--${active_player}`
  ).textContent = current_score;
  active_player = active_player === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

// ----- Rolling Dice Functionality -----
btnRoll.addEventListener('click', function () {
  if (game_status) {
    //1. Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Display dice
    dice_elem.classList.remove('hidden');
    dice_elem.src = `dice-${dice}.png`;

    //3. Check for 1: If true-> next player
    if (dice !== 1) {
      current_score += dice;
      document.getElementById(
        `current--${active_player}`
      ).textContent = current_score;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  //voer dit alleen uit als game_status true is
  if (game_status) {
    score[active_player] += current_score;
    document.getElementById(`score--${active_player}`).textContent =
      score[active_player];

    //als score >= 100 is, zet game_status op false, hide de dice, current_score op 0, zet de class van de active player op winner ipv active
    if (score[active_player] >= 10) {
      game_status = false;
      dice_elem.classList.add('hidden');
      current_score = 0;
      document.getElementById(
        `current--${active_player}`
      ).textContent = current_score;
      document
        .querySelector(`.player--${active_player}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${active_player}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});
