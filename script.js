const gameBoardDiv = document.querySelector('[data-game-board]');

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

        function display() {
            boardPositions.forEach(field => {
                const boardField = document.createElement('div');
                boardField.dataset.position = field.position;
                boardField.classList.add('field');
                boardField.innerHTML = field.occupied;
                gameBoardDiv.appendChild(boardField)
            })
        };

        display();

        const gameField = document.querySelectorAll('.field');

        return {
            boardPositions,
            display,
            gameField
        } 
})();

const Player = (name, mark) => {
    return { name, mark }
};

const gameStart = (() => {

    const firstPlayer = Player('Player1', 'X');
    const secondPlayer = Player('Player2', 'O');

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];

    let actualPlayer = firstPlayer;

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
        console.log(fieldIndex)
        console.log(GameBoard.boardPositions[fieldIndex].occupied)
        console.log(event)
    }



    return { playerAction }

    
})();


GameBoard.gameField.forEach(field => {
    field.addEventListener('click', (event)  => {
        gameStart.playerAction(event.target);

    })
});