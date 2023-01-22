const gameBoardDiv = document.querySelector('[data-game-board]');

const GameBoard = { 
    boardPositions: [
        {
            position: 'row-1-col-1',
            occupied: '&#10005;'
        },
        {
            position: 'row-1-col-2',
            occupied: '&#9711;'
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
};

function displayGameBoard () {

    const board = GameBoard.boardPositions;

    board.forEach(field => {
        const boardField = document.createElement('div');
        boardField.classList.add(field.position);
        boardField.classList.add('field');
        boardField.innerHTML = field.occupied;
        gameBoardDiv.appendChild(boardField)
    })
}

displayGameBoard();