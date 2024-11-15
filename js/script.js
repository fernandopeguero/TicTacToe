"use strict"


function GameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];


    /* Create board grid */
    for(let i = 0; i < rows; i++){
        board[i] = []
        for(let j =0; j < columns; j++){
            board[i].push(Cell())    
        }
    }

    const getBoard = () => board;

    /* Print board */
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
      };

    //   places token in the board
    const placeToken = (position, token) => {
        const valueAtBoardPosition = board[position.row][position.column];

        if(valueAtBoardPosition.getValue() != 0) return -1;
        valueAtBoardPosition.addToken(token)
    }

      return {
        getBoard,
        printBoard,
        placeToken
      }
}


function Cell() {

    let value = "";

    const addToken = (player ) => {
        value = player;
    }

    const getValue = () => value;

    return {
        addToken,
        getValue,
    }

}


function GameController(
    playerOne = "Player One",
    playerTwo = "Player Two",
    tokenOne = "X",
    tokenTwo = "O"
){

    const board = GameBoard();
    let winner = "";

    let isGameOver = false;

    const getGameOver = () => isGameOver

    const players =  [
        {
            name: playerOne,
            token: tokenOne
        } , 
        {
            name: playerTwo,
            token: tokenTwo
        }
    ]


    let activePlayer = players[0]


    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
    }

    const getActivePlayer = () => activePlayer

    const printNewRound = () => {
        board.getBoard()
        console.log(`${activePlayer.name}'s turn`);
    }

    const playRound = (position = {}) => {

        if(Object.keys(position).length === 0) return;

        const tokenPlaced = board.placeToken(position, activePlayer.token);

        if(tokenPlaced === -1) return;
        board.printBoard();
        winner = checkWinner();
        // switch player 
        switchPlayer();
        // reset board
        
       
    }

    const checkWinner = () => {
        const flatBoard = board.getBoard().flat().map(cell => cell.getValue())
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
          ];
        
          for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (flatBoard[a] && flatBoard[a] === flatBoard[b] && flatBoard[b] === flatBoard[c]) {
                console.log(`You Won, ${activePlayer.name} with ${activePlayer.token} token`)
                isGameOver = true;
                // Return the winning symbol ('X' or 'O')
                return activePlayer.token
            }
          }

          return null;
    }


    return {
        getActivePlayer,
        getBoard: board.getBoard,
        playRound,
        getGameOver 
        
    }
}


function ScreenController () {

    const game = GameController();
    const displayTurn = document.querySelector(".display_turn");
    const boardContainer = document.querySelector(".board");
    

    const updateScreen = () => {

        boardContainer.textContent = "";


        const board = game.getBoard()
        const activePlayer = game.getActivePlayer();

        displayTurn.textContent = `${activePlayer.name}'s turn`

        board.forEach((row, i) => row.forEach((cell, j) => {

            const button = document.createElement("button");
            button.classList.add("cell");

            button.dataset.row = i;
            button.dataset.column = j;
            button.textContent = cell.getValue();
            boardContainer.appendChild(button);

        }))
    }

    updateScreen();


}

function ClickHandler() {

}

ScreenController();