let score = JSON.parse(localStorage.getItem('score')) || {
  Wins: 0,
  losses: 0,
  Ties: 0
};

updateScore();
  

/*if (!score) {score = {Wins:0, losses: 0, Ties: 0};} */  
let isAutoplaying = false;
let interValid;


function autoPlay() {
  if (!isAutoplaying) {
    interValid = setInterval(() => { 
      const playermove = pickComputerMove();
      playGame(playermove);
  
    },1000);
    isAutoplaying = true;
    document.querySelector('.js-auto-button').innerHTML = 'Stop playing';
  } else {
    clearInterval(interValid);
    isAutoplaying = false;
    document.querySelector('.js-auto-button').innerHTML = 'Autoplay';

  }
  
}





document.body.addEventListener('keydown', (event) => {
  if (event.key === 'a') { autoPlay();}
  else if (event.key === 'Backspace') {
    resetscore();
  };

})

document.querySelector('.js-auto-button').addEventListener('click', () => {
  autoPlay();
})

document.querySelector('.js-move-button')
.addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button')
.addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button')
.addEventListener('click',() => {
  playGame('scissors');
});

document.body.addEventListener('keydown',(event) => {
  if (event.key === 'r') {
    playGame('rock');}
    else if (event.key === 'p') {
      playGame('paper')}
      else if (event.key === 's') {
        playGame('scissors')
      }
  
});

function resetscore() {
  score.Wins = 0;
    score.losses = 0;
    score.Ties = 0;
    localStorage.removeItem('score');
    updateScore();
}

document.querySelector('.js-reset').addEventListener('click', () => {
  resetscore();
});



function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
    
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {score.Wins +=1;}
  else if (result === 'You lose.') {score.losses +=1;}
  else if (result === 'Tie.') {score.Ties +=1;}

  localStorage.setItem('score',JSON.stringify(score));

  updateScore();

  document.querySelector('.js-result').  
    innerHTML = result;

  document.querySelector('.js-move').
      innerHTML = ` You 
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;
}


function updateScore() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.Wins},Losses: ${score.losses}. Ties: ${score.Ties}`;}



function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}