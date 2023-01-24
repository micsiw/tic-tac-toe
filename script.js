const gameBoardDiv = document.querySelector('[data-game-board]');
const announcerDiv = document.querySelector('[data-game-announcer]');
const resetButton = document.querySelector('[data-button-reset]');

const Player = (name, mark) => {
    return { name, mark }
};

const GameBoard = (() => { 
    const boardPositions = [
        {
            position: 'row-1-col-1',
            occupied: null
        },
        {
            position: 'row-1-col-2',
            occupied: null
        },
        {
            position: 'row-1-col-3',
            occupied: null
        },
        {
            position: 'row-2-col-1',
            occupied: null
        },
        {
            position: 'row-2-col-2',
            occupied: null
        },
        {
            position: 'row-2-col-3',
            occupied: null
        },
        {
            position: 'row-3-col-1',
            occupied: null
        },
        {
            position: 'row-3-col-2',
            occupied: null
        },
        {
            position: 'row-3-col-3',
            occupied: null
        }]

    function displayGrid() {
        boardPositions.forEach(field => {
            const boardField = document.createElement('div');
            boardField.dataset.position = field.position;
            boardField.classList.add('field');
            boardField.innerHTML = field.occupied;
            gameBoardDiv.appendChild(boardField)
        })

        const gameField = document.querySelectorAll('.field');

        gameField.forEach(field => {
            field.addEventListener('click', (event)  => {
                if (GameStart.wonPlayer === null & GameStart.turnCounter < 9) {
                    GameStart.playerAction(event.target);
                    GameStart.isOver();
                    GameStart.turnCounter++
                    GameStart.announcer();
                }
            })
        });
    }

    function resetGrid() {
        gameBoardDiv.innerHTML = '';
        boardPositions.forEach(position => {
            position.occupied = null;
        })
        displayGrid();
        GameStart.wonPlayer = null;
        GameStart.turnCounter = 0;
        GameStart.announcer();
    }

    displayGrid();

    return {
        boardPositions,
        resetGrid
    } 
})();



const GameStart = (() => {
    const firstPlayer = Player('Player X', 'X');
    const secondPlayer = Player('Player O', 'O');
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];

    let turnCounter = 0;
    let actualPlayer = firstPlayer;
    let wonPlayer = null;

    function playerAction(event) {
        const fieldIndex = GameBoard.boardPositions.findIndex(field => field.position === event.dataset.position);

        if (GameBoard.boardPositions[fieldIndex].occupied === null) {
            GameBoard.boardPositions[fieldIndex].occupied = actualPlayer.mark;
            event.innerHTML = actualPlayer.mark;
            event.style.pointerEvents = 'none';
        }

        if (GameBoard.boardPositions[fieldIndex].occupied === 'X') {
            actualPlayer = secondPlayer;
        } else {
            actualPlayer = firstPlayer;
        }
    }

    function isOver() {

        winningCombinations.forEach(combination => {

            let checkMarks = [];

            combination.forEach(index => {
                checkMarks.push(GameBoard.boardPositions[index].occupied)
            })

            if (checkMarks[0] !== null && checkMarks[0] === checkMarks[1]) {
                if (checkMarks[1] !== null && checkMarks[1] === checkMarks[2]) {
                    if (checkMarks[0] === 'X') {
                        GameStart.wonPlayer = firstPlayer;
                    } else {
                        GameStart.wonPlayer = secondPlayer;
                    }
                }
            }

        })
    }

    function announcer() {

        if (GameStart.turnCounter === GameBoard.boardPositions.length && GameStart.wonPlayer === null) {
            announcerDiv.innerHTML = "That's a tie!";
        } else if (GameStart.wonPlayer === firstPlayer) {
            announcerDiv.innerHTML = "Player X's won!"
        } else if (GameStart.wonPlayer === secondPlayer) {
            announcerDiv.innerHTML = "Player O's won!"
        } else {
            actualPlayer === firstPlayer && turnCounter < GameBoard.boardPositions.length ? 
            announcerDiv.innerHTML = "Player X's turn!" : announcerDiv.innerHTML = "Player O's turn!" };
    }

    return {
        playerAction,
        isOver,
        announcer,
        wonPlayer,
        turnCounter
    }

})();

resetButton.addEventListener('click', () => {
    GameBoard.resetGrid();
})