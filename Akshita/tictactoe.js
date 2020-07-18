//var origState;

var box= document.querySelectorAll("td");

var currentPlayer="O";

var currentState;

var max_depth = 4;

function newGame(){

    for(var i=0; i<box.length; i++){
        box[i].textContent="";
    } 

    var si= new State(undefined);
    currentState=si;


    for(var i=0; i<box.length; i++){
        var moveDone=false;
        box[i].addEventListener("click", function(){
            //currentPlayer= currentPlayer=== "X" ? "O" : "X";
            //if(!state.isGameOver()){
                if(this.textContent==""){
                    //this.textContent="currentPlayer";
                    this.textContent="O";
                    
                    //state.board[index]="O";
                    var j= this.getAttribute("value");
                    currentState.board[j]="O";

                    if(!currentState.isGameOver()){
                        makeMove(currentState, 0 , true);
                    }
                }   
        })

    }

}



var reset= document.querySelector("#reset");

reset.addEventListener("click", newGame);

var start= document.querySelector("#start");

start.addEventListener("click", newGame);



// if(State.isGameOver()){
//     for(int i=0; i<box.length; i++){
//         box[i].removeEventListener("click", function(){
//             if(this.textContent===""){
//                 //this.textContent="currentPlayer";
//                 this.textContent="O";
//                 var s=State(si);
//                 s.board.insert["O", i];

//             }
//         })
//     }
// }


function State(old){

    this.player = "";
    // this.oMovesCount = 0;
    this.winner = "undeclared";
    this.board = ["E", "E","E", "E","E", "E","E", "E", "E" ];


    if(typeof old !== "undefined") {
        // if the state is constructed using a copy of another state
        var len = old.board.length;
        this.board = new Array(len);
        for(var itr = 0 ; itr < len ; itr++) {
            this.board[itr] = old.board[itr];
        }

        // this.oMovesCount = old.oMovesCount;
        this.result = old.result;
        this.player = old.player;
    }

    this.advanceTurn = function() {
        this.player = this.player === "X" ? "O" : "X";
    }


    this.availableCells= function() {
        var indxs = [];
        for(var itr = 0; itr < 9 ; itr++) {
            if(this.board[itr] === "E") {
                indxs.push(itr);
            }
        }
        return indxs;
    }


    this.isGameOver = function() {
        //console.log("EnterWhileLoop!");
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



function minimax(state, depth, isMaximizing){
    if(state.isGameOver() || depth==max_depth){
        //return final score of minimax function
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
        var best = {move: undefined, score: -100000};

        var availablePositions = state.availableCells();
        //console.log(state.board);
        //console.log(availablePositions);

        for(var i=0; i<availablePositions.length; i++){

            var nextState= new State(state);
            //nextState.insert("X", availablePositions[i]);
            nextState.board[availablePositions[i]]="X";
            // var current=[availablePositions[i], -infinity]
            console.log(minimax(nextState, depth + 1, false));
            var smallOutput = minimax(nextState, depth + 1, false);
            smallOutput.move=availablePositions[i];

            if(smallOutput.score > best.score){
                best=smallOutput; //make object
            }

            // availableNextStates.insert(nextState, i);
        }

        return best;


    }

    if(!isMaximizing){
        var best = {move: undefined, score: 100000};

        var availablePositions = state.availableCells();

        for(var i=0; i<availablePositions.length; i++){

            var nextState= new State(state);
            //nextState.insert("O", availablePositions[i]);
            nextState.board[availablePositions[i]]="O";
            var smallOutput = minimax(nextState, depth + 1, true);
            smallOutput.move=availablePositions[i];

            if(smallOutput.score < best.score){
                best= smallOutput;
            }

        }

        return best;
    }


}

function makeMove(state, depth, isMaximizing){

    var result =minimax(state, depth, isMaximizing);

    console.log(result.move);

    var s= new State(state);
    box[result.move].textContent="X";
    //s.board.insert["X", result.move];
    s.board[result.move]="X";
    currentState=s;
   
}