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

    /* Print  */
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
      };


    const placeToken = (position, token) => {
        board[position.row, position.column].addToken(token)

    }

      return {
        getBoard,
        printBoard,
        placeToken
      }
}


function Cell() {

    let value = 0;

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
    playerTwo = "Player Two"
){

    const board = GameBoard();

    const players =  [
        {
            name: playerOne,
            token: "X"
        } , 
        {
            name: playerTwo,
            token: "O"
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

    const playRound = (position) => {

    }



    return {
        getActivePlayer,
        
    }
}


function ScreenController () {

}

function ClickHandler() {

}


const game = GameBoard()