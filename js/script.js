"use strict"


function GameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    const createBoard = () => {
            /* Create board grid */
        for(let i = 0; i < rows; i++){
            board[i] = []
            for(let j = 0; j < columns; j++){
                board[i].push(Cell())    
            }
        }

    }

    createBoard()

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
        placeToken,
        createBoard
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

function ScoreKeeper () {

    const score = {
        round: 1,
        players: [0 , 0]
    }

    // get and update rounds 
    const getRound = () => score.round
    const updateRound = () => score.round++;
    // get the score 
    const getPlayerOneScore = () => score.players[0];
    const getPlayerTwoScore = () => score.players[1];


    const resetScore = () => {
        score.round = 1;
        score.players[0] = 0
        score.players[1] = 0;
    }

    const playerOneScored = () => {
        updateRound()
        score.players[0]++;
    }

    const playerTwoScored = () => {
        updateRound()
        score.players[1]++;
    }

    return {
        getRound,
        updateRound,
        getPlayerOneScore,
        getPlayerTwoScore,
        playerOneScored,
        playerTwoScored,
        resetScore
    }

}


function GameController(
    playerOne = "Player One",
    playerTwo = "Player Two",
    tokenOne = "X",
    tokenTwo = "O"
){

    const board = GameBoard();

    let isGameOver = false;

    const getGameOver = () => isGameOver

    const scoreBoard = ScoreKeeper();

    // counst how many cells have been filled to check for a tied simple solution
    let counter  = 0;

    const getCounter = () => counter

    const clearCounter = () => counter = 0;

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
        printNewRound()
        isGameOver = checkWinner();
        // switch player 
        switchPlayer();
        // update count 
        counter++;
        
        return true;
       
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
                if(activePlayer === players[0]){
                    scoreBoard.playerOneScored()
                } else {
                    scoreBoard.playerTwoScored()
                }
                return  true;
            }
          }

          return false;
    }

    function resetScore () {
        scoreBoard.resetScore()
        isGameOver = false
        board.createBoard()
    }

    function clearBoard() {
        board.createBoard()
    }


    return {
        getActivePlayer,
        getBoard: board.getBoard,
        playRound,
        getGameOver,
        resetBoard: resetScore,
        clearBoard: clearBoard,
        round: scoreBoard.getRound,
        playerOne: scoreBoard.getPlayerOneScore,
        playertwo: scoreBoard.getPlayerTwoScore,
        getCounter: getCounter,
        nextRound: scoreBoard.updateRound,
        resetCounter: clearCounter
       
        
    }
}


function ScreenController () {

    const game = GameController();
    const displayTurn = document.querySelector(".display_turn");
    const boardContainer = document.querySelector(".board");

    const startButton = document.querySelector(".start");
    const restartButton = document.querySelector(".restart");

    // update score for each player 

    const playerOneScoreBoard = document.querySelector(".player_one_score");
    const playerTwoScoreBoard = document.querySelector(".player_two_score");
    

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

        if(game.getCounter() === 9) {

        
            game.nextRound();
            game.resetCounter()
            
            displayTurn.textContent = "It's a Tie";
            UpdateRoundText();
            startButton.disabled = false;
          

            disabledCells();
            

        }


    }

    const resetBoard = () => {
        game.resetBoard();
        updateScoreBoard();
        updateScreen();
        startButton.textContent = "START GAME";
    }

    function ClickHandler (e)  {

        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;
        const activePlayer = game.getActivePlayer()

        if(!selectedRow) return;
        if(!selectedColumn) return;

        game.playRound({row: selectedRow, column: selectedColumn})
        updateScreen();

        if(game.getGameOver()) {
            displayTurn.textContent =  `You Won, player ${activePlayer.token}`;

            game.resetCounter();
            updateScoreBoard();
            disabledCells()
            UpdateRoundText();
            startButton.disabled = false;

            return;
        }

    }

    function disabledCells() {

        const cells = boardContainer.children;

        for(let i =0; i < cells.length; i++){

            cells[i].disabled = true;
        }

    }


    function updateScoreBoard () {
        playerOneScoreBoard.textContent = game.playerOne();
        playerTwoScoreBoard.textContent = game.playertwo();
    }

    function HandleRound() {


         if(game.round() > 1) {
            game.clearBoard()
            updateScreen();
            this.disabled = true;

        } else {
            this.disabled = true;
            restartButton.disabled = false
            updateScreen()
        }
    }

    function UpdateRoundText() {
        const currentRound = game.round()

        if( currentRound > 1) {
            startButton.textContent = `START ROUND: ${currentRound}`
        }
    }

    boardContainer.addEventListener("click", ClickHandler)
    startButton.addEventListener("click", HandleRound)
    restartButton.addEventListener("click", function () {
        this.disabled = true;
        startButton.disabled = false
        resetBoard()
    })
    
}


ScreenController();