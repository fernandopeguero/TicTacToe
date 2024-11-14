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
    let winner = "";

    const getWinner = () => winner === "" ? "No winner yet" : winner;

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
        winner = checkWinner();
    }

    const checkWinner = () => {
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
            if (board[a] && board[a] === board[b] && board[b] === board[c]) {
              return `${activePlayer.token}'s the winner`;
                // Return the winning symbol ('X' or 'O')
            }
          }

          return null;
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