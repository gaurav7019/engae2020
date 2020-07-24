const GAME_SIMULATIONS = 65;
const boardDiv = document.getElementById('board');
const hintsDiv = document.getElementById('hints');

let humanPlayer = 'X';
let computerPlayer = 'O';
let humanTurn = true;
let gameOver = false;

boardDiv.addEventListener('click', function(event){

    if(gameOver){
        return;
    }

    if(humanTurn){
        let row = event.target.getAttribute('row');
        let col = event.target.getAttribute('col');

        makeMove(board, humanPlayer, row, col);
        drawBoard(board);
        humanTurn = false;

        if(returnWinner(board) !== null){
            gameOver = true;
        }
        setTimeout(computerMove, 500);

    }

});

hintsDiv.addEventListener('mouseover', function(event){
    colorCodeHelpPlayer(board);
});

let board = [
                [null, null, null],
                [null, null, null],
                [null, null, null],
            ];

function computerMove(){

    if(gameOver){
        return;
    }

    let emptySquares = getEmptySquares(board);


    if(emptySquares.length === 0){
        return;
    } else if(emptySquares.length === 1){
        makeMove(board, computerPlayer, emptySquares[0][0], emptySquares[0][1]);
        drawBoard(board);
        return;
    }


    let scoredBoard = scoreBoard(board, computerPlayer);

    let nextMove = getBestScoredPosition(scoredBoard);
    
    makeMove(board, computerPlayer, nextMove[0], nextMove[1]);
    drawBoard(board);

    if(returnWinner(board) !== null){
        gameOver = true;
    }

    humanTurn = true;

}

function getBestScoredPosition(scoredBoard){
    let topScore = -9999;
    let nextMove = [];

    for(let i = 0; i < scoredBoard.length; i++){
        for(let j = 0; j < scoredBoard[0].length; j++){

            
            if(scoredBoard[i][j] !== null && scoredBoard[i][j] > topScore){
                topScore = scoredBoard[i][j];
                nextMove = [i,j];
            }
        }
    }

    return nextMove;
}

function returnWinner(board){
    let rows = board.length;
    let cols = board[0].length;

    for(let i = 0; i < rows; i++){
        if(board[i][0] === board[i][1] && board[i][0] === board[i][2]){
            return board[i][0];
        }
        else if(board[0][i] === board[1][i] && board[0][i] === board[2][i]){
            return board[0][i];
        }   
    }

    if(board[0][0] === board[1][1] && board[0][0] === board[2][2]){
        return board[0][0];
    }

    if(board[0][2] === board[1][1] && board[0][2] === board[2][0]){
        return board[0][2];
    }

    if(isFullBoard(board)){
        return 'tie';
    }
    
    return null;
}

function isFullBoard(board){
    let nullCount = 0;
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board.length; j++){
            if(board[i][j] === null){
                nullCount++;
            }
        }
    }
    if(nullCount > 0){
        return false;
    }
    return true;
}


function getEmptySquares(board){

    let emptySquares = [];

    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[0].length; j++){
            if(board[i][j] === null){
                emptySquares.push([i, j]);
            }
        }
    }

    return emptySquares;
}

function generateRandomMove(board){
    let emptySquares = getEmptySquares(board);

    if(emptySquares.length === 0){
        return null;
    }
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
}

function makeMove(board, player, row, col){
    board[row][col] = player;
}

function playUntilWin(board, startPlayer){
    
    while(returnWinner(board) === null){
        let randomMove = generateRandomMove(board);
        makeMove(board, startPlayer, randomMove[0], randomMove[1]);
        startPlayer === 'X' ? startPlayer = 'O' : startPlayer = 'X';
    }

    return returnWinner(board);
}

function scoreBoard(board, player){
    let scoredBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    let opponent;
    player === 'X' ? opponent = 'O' : opponent = 'X';

    let scoreConverter = {};
    scoreConverter[player] = 1;
    scoreConverter[opponent] = -1;
    scoreConverter['tie'] = 0;

    let emptySquares = getEmptySquares(board);

    emptySquares.forEach(function(space){
        let boardCopy = deepCopyBoard(board);

        makeMove(boardCopy, player, space[0], space[1]);
        for(let k = 0; k < GAME_SIMULATIONS; k++){
            let currSimulationBoardCopy = deepCopyBoard(boardCopy);
            let result = playUntilWin(currSimulationBoardCopy, opponent);
            scoredBoard[space[0]][space[1]] += scoreConverter[result];
        }       
    });

    let occupiedSquares = getOccupiedSquares(board);

    occupiedSquares.forEach(function(square){
        scoredBoard[square[0]][square[1]] = null;
    });

    return scoredBoard;

}

function getOccupiedSquares(board){
    let occupiedSquares = [];
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[0].length; j++){
            if(board[i][j] !== null){
                occupiedSquares.push([i,j]);
            }
        }
    }
    return occupiedSquares;
}

function deepCopyBoard(board){
    let boardCopy = [];
    for(let i = 0; i < board.length; i++){
        boardCopy[i] = board[i].slice();
    }
    return boardCopy;
}

function getClearedBoardDiv(){
    while(boardDiv.firstChild){
        boardDiv.removeChild(boardDiv.firstChild);
    }
    return boardDiv;
};

function drawBoard(board){

    let clearedBoardDiv = getClearedBoardDiv();
    
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[0].length; j++){
            let square = document.createElement('div');
            square.classList.add('square');
            if(board[i][j] !== null){
                let squareFill = document.createTextNode(`${board[i][j]}`);
                square.appendChild(squareFill);
            }
            square.setAttribute('row', i);
            square.setAttribute('col', j);
            clearedBoardDiv.appendChild(square);
        }
    }
}

function drawColorCodedBoard(board, scoredBoard, maxVal){

    console.log(scoredBoard);
    console.log('running');
    let clearedBoardDiv = getClearedBoardDiv();
    
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[0].length; j++){
            let square = document.createElement('div');
            square.classList.add('square');
            if(board[i][j] !== null){
                let squareFill = document.createTextNode(`${board[i][j]}`);
                square.appendChild(squareFill);
                

            }

            console.log('scordd board: ', scoredBoard[i][j]);
            if(scoredBoard[i][j] < 0){
                console.log('got here - neg');
                let colorStyle = 'rgba(244,66,66,';
                let opacity = parseFloat(Math.abs(scoredBoard[i][j]) / maxVal);
            
                colorStyle += opacity;
                colorStyle += ')';
                console.log(colorStyle);
                square.style.background = colorStyle;
            }

            if(scoredBoard[i][j] >= 0){
                console.log('got here  - pos');

                let colorStyle = 'rgba(77,255,61,';
                let opacity = parseFloat(Math.abs(scoredBoard[i][j]) / maxVal);
                colorStyle += opacity;
                colorStyle += ')';
                console.log(colorStyle);

                square.style.background = colorStyle;
            }

            square.setAttribute('row', i);
            square.setAttribute('col', j);
            clearedBoardDiv.appendChild(square);
        }
    }
}



function colorCodeHelpPlayer(){
    let scoredBoard = scoreBoard(board, humanPlayer);
    let minVals = [];
    let maxVals = [];
    scoredBoard.forEach(function(array){
        minVals.push(Math.min.apply(null, array));
        maxVals.push(Math.max.apply(null, array));
    });

    let maxVal = Math.max.apply(null, maxVals);
    let minVal = Math.min.apply(null, minVals);

    console.log(maxVal, minVal);
      

    drawColorCodedBoard(board, scoredBoard, maxVal);    
}




drawBoard(board);

