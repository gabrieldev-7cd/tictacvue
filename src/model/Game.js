class Game {
    constructor(player1){
        this._player1 = player1;
        this._player2 = null;
        this._board = new Board();
        this._gameOver = null;
        this._winner = null;
        this._turnOf = "X";
    }

    get player1 () {
        return this._player1;
    }

    get player2 () {
        return this._player2;
    }

    set player2(player2){
        this.player2.symbol = "O";
        this._player2 = player2;
    }

    get board(){
        return this._board;
    }

    get gameOver() {
        return this._gameOver;
    }

    changeTurn(){
        this._turnOf = this._turnOf == "X" ? "O" : "X";
    }

}
export default Game;

