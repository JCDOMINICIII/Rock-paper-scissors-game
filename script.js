let score = JSON.parse(localStorage.getItem('score')) || {
      Wins: 0,
      Losses: 0,
      Ties: 0
    };

    function updateScoreMove() {
      document.querySelector('.js-score')
      .innerHTML = `Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`;
    }

      let isAutoPlaying = false;
    let intervalId;

    function autoplay () {
      if (!isAutoPlaying) {
         intervalId = setInterval(function () {
          const playerMove = pickComputerMove();
          playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
        
      } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
      }
    }

    document.querySelector('.js-rock-button')
      .addEventListener('click', () => {
        playGame('rock');
      });

     document.querySelector('.js-paper-button')
      .addEventListener('click', () => {
        playGame('paper');
      });

     document.querySelector('.js-scissors-button')
      .addEventListener('click', () => {
        playGame('scissors');
      });

     document.querySelector('.js-reset-button')
      .addEventListener('click', () => {
        score.Wins = 0;
        score.Losses = 0;
        score.Ties = 0;
        localStorage.removeItem('score');
        updateScoreMove();
      });

    document.querySelector('.js-autoplay-button')
      .addEventListener('click', () => {
        autoplay();
      });

    document.body.addEventListener('keydown', (event) => {
      if (event.key === 'r') {
        playGame('rock');
      } else if (event.key === 'p') {
        playGame('paper');
      } else if (event.key === 's') {
        playGame('scissors');
      }
    });

    function playGame(playerMove) {
      const computerMove = pickComputerMove();
      let result = '';

      if (playerMove === 'scissors') {
         if (computerMove === 'rock') {
          result = 'You Lose';
        } else if (computerMove === 'paper') {
          result = 'You Win';
        } else if (computerMove === 'scissors') {
          result = 'Tie'
        }
      } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
          result = 'You Win';
        } else if (computerMove === 'paper') {
          result = 'Tie';
        } else if (computerMove === 'scissors') {
          result = 'You Lose'
        }
      } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
          result = 'Tie';
        } else if (computerMove === 'paper') {
          result = 'You Lose';
        } else if (computerMove === 'scissors') {
          result = 'You Win'
        }
      }

      if (result === 'You Win') {
        score.Wins++;
      } else if (result === 'You Lose') {
        score.Losses++;
      } else if (result === 'Tie') {
        score.Ties++;
      }

      localStorage.setItem('score', JSON.stringify(score));
      updateScoreMove();

       document.querySelector('.js-result')
      .innerHTML = result;

      document.querySelector('.js-moves')
       .innerHTML = `You
        <img src="images/${playerMove}-emoji.png" alt="Rock" class="move-icon">
        <img src="images/${computerMove}-emoji.png" alt="Rock" class="move-icon">
        Computer`;
      }

    function pickComputerMove() {
      const randomNumber = Math.random();

      let computerMove = '';

      if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
      } else if (randomNumber >= 1 / 3 && randomNumber < 2 /3) {
        computerMove = 'paper';
      } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissors';
      }
      return computerMove;
    }