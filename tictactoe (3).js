var box= document.querySelectorAll("td");
var currentState;
var max_depth;
var startingPlayer;

// var reset= document.querySelector("#reset");
// reset.addEventListener("click", newGame);

var start= document.querySelector("#start");
start.addEventListener("click", newGame);

function newGame(){
    
    for(var i=0; i<box.length; i++){
        box[i].textContent="";
    } 

    startingPlayer = document.getElementById("startingPlayer").value;
    max_depth = Number(document.getElementById("depthSelect").value);
    var si= new State(undefined);
    currentState=si;

    if(startingPlayer == "aiagent"){
        //Choosing a random index
        var choosenIndex = Math.floor(Math.random() * 6);
        var arr = [0, 2, 4, 6, 8];

        box[arr[choosenIndex]].textContent = "X";
        var j = box[arr[choosenIndex]].getAttribute("value");
        currentState.board[j] = "X";
    }

    for(var i=0; i<box.length; i++){
        box[i].addEventListener("click", function(){
            if(this.textContent=="" && !currentState.isGameOver()){
                this.textContent="O";

                var j= this.getAttribute("value");
                currentState.board[j]="O";

                if(!currentState.isGameOver()){
                    makeMove(currentState, 0 , true);
                }
            }
        })
    }
}

function State(old){

    this.player = "";
    this.winner = "undeclared";
    this.board = ["E", "E","E", "E","E", "E","E", "E", "E" ];

    if(typeof old !== "undefined") {
        // if the state is constructed using a copy of another state
        var len = old.board.length;
        this.board = new Array(len);
        for(var itr = 0 ; itr < len ; itr++) {
            this.board[itr] = old.board[itr];
        }
    }

    this.availableCells = function() {
        var indxs = [];
        for(var itr = 0; itr < 9 ; itr++) {
            if(this.board[itr] === "E") {
                indxs.push(itr);
            }
        }
        return indxs;
    }


    this.isGameOver = function() {
        var B = this.board;

        //check rows
        for(var i = 0; i <= 6; i = i + 3) {
            if(B[i] !== "E" && B[i] === B[i + 1] && B[i + 1] == B[i + 2]) {
                this.winner = B[i] ; //update the state result
                return true;
            }
        }

        //check columns
        for(var i = 0; i <= 2 ; i++) {
            if(B[i] !== "E" && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
                this.winner = B[i] ; //update the state result
                return true;
            }
        }

        //check diagonals
        for(var i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
            if(B[i] !== "E" && B[i] == B[i + j] && B[i + j] === B[i + 2*j]) {
                this.winner = B[i] ; //update the state result
                return true;
            }
        }

        var available = this.availableCells();
        if(available.length == 0) {
            //the game is draw
            this.winner = "draw"; //update the state result
            return true;
        }
        else {
            return false;
        }
    };

};


function minimax(state, depth, alpha, beta, isMaximizing){
    if(state.isGameOver() || depth==max_depth){
        //return static evalution of the state
        if(state.winner==="X"){
            return {move: undefined, score: 100 - depth}; //correct sign of depth
        }
        else if(state.winner==="O"){
            return {move: undefined, score: -100 + depth};
        }
        return {move: undefined, score: 0} ;
    }

    var result = {move: undefined, score: undefined};

    if(isMaximizing){
        var best = {move: undefined, score: -Infinity};

        var availablePositions = state.availableCells();

        for(var i=0; i<availablePositions.length; i++){

            var nextState= new State(state);
            //nextState.insert("X", availablePositions[i]);
            nextState.board[availablePositions[i]]="X";
            // var current=[availablePositions[i], -infinity]
            var smallOutput = minimax(nextState,depth + 1, alpha, beta, false);
            smallOutput.move=availablePositions[i];

            if(smallOutput.score > best.score){
                best=smallOutput; //make object
            }
            alpha = Math.max(alpha, smallOutput.score);
            if(beta <= alpha){
                break;
            }
        }

        return best;
    }

    if(!isMaximizing){
        var best = {move: undefined, score: Infinity};
        var availablePositions = state.availableCells();

        for(var i=0; i<availablePositions.length; i++){
            var nextState= new State(state);
            nextState.board[availablePositions[i]]="O";
            var smallOutput = minimax(nextState, depth + 1, alpha, beta, true);
            smallOutput.move=availablePositions[i];

            if(smallOutput.score < best.score){
                best= smallOutput;
            }

            beta = Math.min(beta, smallOutput.score);
            if(beta <= alpha){
                break;
            }
        }
        return best;
    }


}

function sugg(state, depth, alpha, beta, isMaximizing){
    if(state.isGameOver() || depth==max_depth){
        //return static evalution of the state
        if(state.winner==="O"){
            return {move: undefined, score: 100 - depth}; //correct sign of depth
        }
        else if(state.winner==="X"){
            return {move: undefined, score: -100 + depth};
        }
        return {move: undefined, score: 0} ;
    }

    var result = {move: undefined, score: undefined};

    if(isMaximizing){
        var best = {move: undefined, score: -Infinity};

        var availablePositions = state.availableCells();

        for(var i=0; i<availablePositions.length; i++){

            var nextState= new State(state);
            //nextState.insert("X", availablePositions[i]);
            nextState.board[availablePositions[i]]="O";
            // var current=[availablePositions[i], -infinity]
            var smallOutput = sugg(nextState,depth + 1, alpha, beta, false);
            smallOutput.move=availablePositions[i];

            if(smallOutput.score > best.score){
                best=smallOutput; //make object
            }
            alpha = Math.max(alpha, smallOutput.score);
            if(beta <= alpha){
                break;
            }
        }

        return best;
    }

    if(!isMaximizing){
        var best = {move: undefined, score: Infinity};
        var availablePositions = state.availableCells();

        for(var i=0; i<availablePositions.length; i++){
            var nextState= new State(state);
            nextState.board[availablePositions[i]]="X";
            var smallOutput = sugg(nextState, depth + 1, alpha, beta, true);
            smallOutput.move=availablePositions[i];

            if(smallOutput.score < best.score){
                best= smallOutput;
            }

            beta = Math.min(beta, smallOutput.score);
            if(beta <= alpha){
                break;
            }
        }
        return best;
    }


}


function makeMove(state, depth, isMaximizing){

    var result = minimax(state, depth, -Infinity, Infinity, isMaximizing);
    // var result = minimax(state, depth, isMaximizing);

    console.log(result.move);

    var s= new State(state);
    box[result.move].textContent="X";
    //s.board.insert["X", result.move];
    s.board[result.move]="X";
    currentState=s;

    var suggi=sugg(currentState, 0 , false, "O");
    var i=suggi.move;
    console.log("human suggestion " + i);

}