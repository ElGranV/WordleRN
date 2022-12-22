const directions = {
    "N": [ -1, 0 ],
    "S": [ 1, 0 ],
    "E": [ 0, 1 ],
    "W": [ 0, -1 ],
    "NE": [ -1, 1 ],
    "NW": [ -1, -1 ],
    "SE": [ 1, 1 ],
    "SW": [ 1, -1 ]
}
const axis = [
    "N-S",
    "E-W",
    "NW-SE",
    "NE-SW"
]



function propagateInDirection(grid, row, column, direction, distance = 1)
{

    let i, j = directions[ direction ];
    i = i * distance; j = j * distance;
    i += row; j += column;
    let value = 0;
    if (i >= 0 && i < grid.length && j >= 0 && j < grid[ 0 ].length)
    {
        value = grid[ i ][ j ].valueOf();
    }
    return value;
}

export default class MorpionGrid
{
    constructor (winningNumber = 3)
    {
        winningNumber = (winningNumber % 3) + 3;
        if (winningNumber == 5) this.grid = Array(14).fill().map(_ => Array(14).fill(0));
        else this.grid = Array(10).fill().map(_ => Array(10).fill(0));
        this.winningNumber = winningNumber;
        this.currentPlayer = 1;
        this.winningPlayer = 0;
        this.map = this.grid.map.bind(this);
    }

    play(row, column)
    {
        console.log("play : [", row, ",", column, "] ->", this.currentPlayer)
        this.grid[ row ][ column ] = this.currentPlayer.valueOf();
        console.log(this.grid[ 0 ][ column ])
        const victory = this._checkPlayerVictory();
        if (!victory) this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        else this.winningPlayer = this.currentPlayer;
        return victory;
    }
    at(row, column)
    {
        return this.grid[ row ][ column ];
    }

    _checkPlayerVictory(row, column)
    {
        let victory = false;
        for (let ax of axis)
        {
            let numberOfAligned = 1;
            let dirs = ax.split("-");
            let i, j = [ row, column ];
            let distance = 1;
            do
            {
                for (let c = 0; c < dirs.length; c++)
                {
                    let value = propagateInDirection(this.grid, i, j, dirs[ c ], distance);
                    if (value !== this.currentPlayer) dirs.splice(c, 1);
                    else numberOfAligned += 1;
                }
                distance++;
                if (numberOfAligned === this.winningNumber) victory = true;
            } while (numberOfAligned !== this.winningNumber && dirs.length !== 0);

        }
        return victory;
    }

}