const gameBoardDiv = document.querySelector('[data-game-board]');
const announcerDiv = document.querySelector('[data-game-announcer]');

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
                    if (GameStart.wonPlayer === null) {
                        GameStart.playerAction(event.target);
                        GameStart.isOver();
                    }
                })
            });
        }

        displayGrid();

        function resetGrid() {
            gameBoardDiv.innerHTML = '';
            boardPositions.forEach(position => {
                position.occupied = null;
            })
            GameStart.wonPlayer = null;
            displayGrid();
        }

        return {
            boardPositions,
            resetGrid
        } 
})();

const Player = (name, mark) => {
    return { name, mark }
};

const GameStart = (() => {

    const firstPlayer = Player('Player1', 'X');
    const secondPlayer = Player('Player2', 'O');

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];

    let actualPlayer = firstPlayer;
    let wonPlayer = null;

    function playerAction(event) {
        const fieldIndex = GameBoard.boardPositions.findIndex(field => field.position === event.dataset.position);

        if (GameBoard.boardPositions[fieldIndex].occupied === null) {
            GameBoard.boardPositions[fieldIndex].occupied = actualPlayer.mark;
            event.innerHTML = actualPlayer.mark;
        }

        if (GameBoard.boardPositions[fieldIndex].occupied === 'X') {
            actualPlayer = secondPlayer;
        } else {
            actualPlayer = firstPlayer;
        }
    }

    function isOver () {

        winningCombinations.forEach(combination => {

            let checkMarks = [];

            combination.forEach(index => {
                checkMarks.push(GameBoard.boardPositions[index].occupied)
            })

            if (checkMarks[0] !== null && checkMarks[0] === checkMarks[1]) {
                if (checkMarks[1] !== null && checkMarks[1] === checkMarks[2]) {
                    if (checkMarks[0] === 'X') {
                        GameStart.wonPlayer = firstPlayer;
                        console.log('PLAYER X WON')
                    } else {
                        GameStart.wonPlayer = secondPlayer;
                        console.log('PLAYER O WON')
                    }
                }
            }

        })
    }



    return { playerAction, isOver, wonPlayer }

    
})();