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

        const display = (() => {
            boardPositions.forEach(field => {
                const boardField = document.createElement('div');
                boardField.dataset.position = field.position;
                boardField.classList.add('field');
                boardField.innerHTML = field.occupied;
                gameBoardDiv.appendChild(boardField)
            })
        })();

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

const gameController = () => {
    const firstPlayer = Player('Player1', 'X');
    const secondPlayer = Player('Player2', 'O');

}


GameBoard.gameField.forEach(field => {
    field.addEventListener('click', ()  => {
        field.innerHTML = 'X'
    })
});