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

    //   palces token in the board
    const placeToken = (position, token) => {
        const valueAtBoardPosition = board[position.row][position.column];

        if(valueAtBoardPosition === 0) return;
        valueAtBoardPosition.addToken(token)
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
    playerTwo = "Player Two",
    tokenOne = "X",
    tokenTwo = "O"
){

    const board = GameBoard();

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

        board.placeToken(position, activePlayer.token);
        // switch player 
        switchPlayer();
        // reset board
        board.printBoard();
    }



    return {
        getActivePlayer,
        getBoard: board.getBoard,
        playRound
        
    }
}


function ScreenController () {

}

function ClickHandler() {

}


const game = GameController()