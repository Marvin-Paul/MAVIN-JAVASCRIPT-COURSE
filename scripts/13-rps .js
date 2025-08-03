 // Initialize score if it doesn't exist in localStorage
let score = JSON.parse(localStorage.getItem('score')) || {
            wins: 0,
            losses: 0,
            ties: 0
        };

        updateScoreElement();
        let isAutoPlaying = false;
        let intervalId;


function autoPlay() {
            if (!isAutoPlaying) {
                intervalId = setInterval(() => {
                    const moves = ['rock', 'paper', 'scissors'];
                    const randomMove = moves[Math.floor(Math.random() * 3)];
                    playGame(randomMove);
                }, 1000);
                isAutoPlaying = true;
                document.querySelector('.js-auto-button').textContent = 'Stop Auto Play';
            } else {
                clearInterval(intervalId);
                isAutoPlaying = false;
                document.querySelector('.js-auto-button').textContent = 'Auto Play';
            }
        }

        // Event listeners for buttons
        document.querySelector('.js-rock-button').addEventListener('click', () => {
            playGame('rock');
        });

        document.querySelector('.js-paper-button').addEventListener('click', () => {
            playGame('paper');
        });

        document.querySelector('.js-scissors-button').addEventListener('click', () => {
            playGame('scissors');
        });

        document.querySelector('.js-auto-button').addEventListener('click', () => {
            autoPlay();
        });

        document.querySelector('.js-reset-button').addEventListener('click', () => {
            resetScore();
        });

        // Keyboard event listener
        document.body.addEventListener('keydown', (event) => {
            if (event.key === 'r' || event.key === 'R') {
                playGame('rock');
            } else if (event.key === 'p' || event.key === 'P') {
                playGame('paper');
            } else if (event.key === 's' || event.key === 'S') {
                playGame('scissors');
            } else if (event.key === 'a' || event.key === 'A') {
                autoPlay();
            } else if (event.key === 'Backspace') {
                resetScore();
            }
        });

        function playGame(playerMove) {
            const computerMove = pickComputerMove();
            let result = '';

            if (playerMove === 'scissors') {
                if (computerMove === 'rock') {
                    result = 'You lose!';
                } else if (computerMove === 'paper') {
                    result = 'You win!';
                } else if (computerMove === 'scissors') {
                    result = 'Tie!';
                }
            } else if (playerMove === 'paper') {
                if (computerMove === 'rock') {
                    result = 'You win!';
                } else if (computerMove === 'paper') {
                    result = 'Tie!';
                } else if (computerMove === 'scissors') {
                    result = 'You lose!';
                }
            } else if (playerMove === 'rock') {
                if (computerMove === 'rock') {
                    result = 'Tie!';
                } else if (computerMove === 'paper') {
                    result = 'You lose!';
                } else if (computerMove === 'scissors') {
                    result = 'You win!';
                }
            }

            // Update score
            if (result === 'You win!') {
                score.wins += 1;
            } else if (result === 'You lose!') {
                score.losses += 1;
            } else if (result === 'Tie!') {
                score.ties += 1;
            }

            // Save to localStorage
            localStorage.setItem('score', JSON.stringify(score));

            // Update UI
            updateScoreElement();
            document.querySelector('.js-result').innerHTML = result;
            document.querySelector('.js-player-move').src = imageSources[playerMove];
            document.querySelector('.js-computer-move').src = imageSources[computerMove];
        }

        function resetScore() {
            score.wins = 0;
            score.losses = 0;
            score.ties = 0;
            localStorage.setItem('score', JSON.stringify(score));
            updateScoreElement();
            document.querySelector('.js-result').innerHTML = 'Score has been reset!';
            document.querySelector('.js-player-move').src = imageSources.question;
            document.querySelector('.js-computer-move').src = imageSources.question;
        }

        function updateScoreElement() {
            document.querySelector('.js-wins').textContent = score.wins;
            document.querySelector('.js-losses').textContent = score.losses;
            document.querySelector('.js-ties').textContent = score.ties;
        }

        function pickComputerMove() {
            const randomNumber = Math.random();
            if (randomNumber < 1/3) {
                return 'rock';
            } else if (randomNumber < 2/3) {
                return 'paper';
            } else {
                return 'scissors';
            }
        }