// Initialize score if it doesn't exist in localStorage
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

 updateScoreElement();



 //let isAutoPlaying = false;  
 //let intervalId;

function autoPlay() {

let isAutoPlaying = false;  
 let intervalId;



  if (!isAutoPlaying) {
  intervalId = setInterval(function(){
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  }else{
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
 

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'scissor') {
    if (computerMove === 'ROCK') {
      result = 'u Lose';
    } else if (computerMove === 'PAPER') {
      result = 'u win';
    } else if (computerMove === 'SCISSOR') {
      result = 'Tie';
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'ROCK') {
      result = 'u win';
    } else if (computerMove === 'PAPER') {
      result = 'Tie';
    } else if (computerMove === 'SCISSOR') {
      result = 'u Lose';
    }
  } else if (playerMove === 'rock') {
    if (computerMove === 'ROCK') {
      result = 'Tie';
    } else if (computerMove === 'PAPER') {
      result = 'u Lose';
    } else if (computerMove === 'SCISSOR') {
      result = 'u win';
    }
  }
  
  // Update score
  if (result === 'u win') {
    score.wins += 1;
  } else if (result === 'u Lose') {
    score.losses += 1;
  } else if (result === 'Tie') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

    
 document.querySelector('.js-result').innerHTML = result;

document.querySelector('.js-move').innerHTML = `You <img src="images/${playerMove}.jpeg" class="img-button">
 <img src="images/${computerMove}.jpeg" class="img-button"> Computer </p>`;

  
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.setItem('score', JSON.stringify(score));
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  alert('Score has been reset!');
}

function updateScoreElement() {
  document.querySelector('.js-score')
   .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
 
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'ROCK';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'PAPER';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'SCISSOR';
  }

  return computerMove;
}
}
