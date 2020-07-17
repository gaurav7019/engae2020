//var origState;

var box= document.querySelectorAll("td");

var currentPlayer="O";

var currentState;

function newGame(){

    for(var i=0; i<box.length; i++){
        box[i].textContent="";
    } 

    var si= new State(undefined);
    currentState=si;

    humanTurn(currentState);
    
    while(!currentState.isGameOver()){
        //Alternate turns of Human and AI
        console.log("humanTurnDone!");
        if(currentPlayer==="X"){
            humanTurn(currentState);
            currentPlayer="O";
        }

        if(currentPlayer==="O"){
            makeMove(currentState, 3 , "X");
            currentPlayer="X";
        }
    }

}

function humanTurn(state){

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
                    state.board[j]="O";

                    currentState=state;
                    moveDone=true;
                    //currentPlayer="O";
                }   
        })
        if(moveDone){
            break;
        }
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
            if(this.board[itr] == "E") {
                indxs.push(itr);
            }
        }
        return indxs;
    }

    // this.isFull=function(){

    // }

    // this.isEmpty = function(){

    // }


    this.isGameOver = function() {
        console.log("EnterWhileLoop!");
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



function minimax(state, depth, playertype){
    if(state.isGameOver() || depth == this.max_depth){
        //return final score of minimax function
        if(state.winner==="X"){
            return [null, 100 - depth]; //correct sign of depth
        }
        else if(state.winner==="O"){
            return [null, -100 + depth];
        }
        return [null, 0] ;
    }

    var move;
    var score;

    if(playertype=="max"){
        var best = [null, -infinity]

        var availablePositions = state.availableCells();

        // var availableNextStates = availablePositions.map(function(){
            
        //     var nextState=State(state);
        //     nextState.insert("O", availablePositions);
        // });

        // var availableNextStates=[]

        for(var i=0; i<availablePositions.length; i++){

            var nextState=State(state);
            nextState.insert("X", availablePositions[i]);
            // var current=[availablePositions[i], -infinity]
            [move, score] = minimax(nextState, depth - 1, playertype="min");
            move=availablePositions[i];

            if(score>best.score){
                best=[move,score];
            }

            // availableNextStates.insert(nextState, i);
        }

        return best;


    }

    if(playertype=="min"){
        var best = [null, +infinity]

        var availablePositions = state.availableCells();

        for(var i=0; i<availablePositions.length; i++){

            var nextState=State(state);
            nextState.insert("O", availablePositions[i]);
            [move, score] = minimax(nextState, depth - 1, playertype="max");
            move=availablePositions[i];

            if(score<best.score){
                best=[move,score];
            }

        }

        return best;
    }


}


function makeMove(state, depth, playertype){
    var move;
    var score;

    [move,score]=minimax(state, depth, playertype);

    var s=State(state);
    box[move].textContent="X";
    s.board.insert["X", move];
    currentState=s;

    // if(playertype=="max"){
    //     var s=State(state)
    //     s.board.insert["O", move];
    //     box[move].textContent="O";
    // }

    // else if(playertype=="min"){
    //     var s=State(state)
    //     s.board.insert["X", move];
    //     box[move].textContent="X";
    // }
    
}