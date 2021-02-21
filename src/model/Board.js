class Board {
    constructor () {
        this._cells = [
            {symbol: null},
            {symbol: null},
            {symbol: null},

            {symbol: null},
            {symbol: null},
            {symbol: null},

            {symbol: null},
            {symbol: null},
            {symbol: null},

        ];
    }

    getCell(index){
        return this._cells[index];
    }

    setCell(index, symbol){
        this._cells[index].symbol = symbol;
    }

    get cells(){
        return this._cells;
    }

    reset() {
        this._cells.forEach((cell) => (cell.symbol = null));
    }

}

export default Board;