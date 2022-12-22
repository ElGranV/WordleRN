const grids = [
    [[1,2,6,5,7,8,4,3,9],
    [4,8,5,9,3,2,1,7,6],
    [7,9,3,1,4,6,5,8,2],
    [2,6,1,4,5,7,8,9,3],
    [8,3,9,2,6,1,7,5,4],
    [5,7,4,3,8,9,2,6,1],
    [6,5,2, 8,9,4,3,1,7],
    [9,4,8,7,1,3,6,2,5],
    [3,1,7,6,2,5,9,4,8]],

    [
        [5,3,4,6,7,8,9,1,2],
        [6,7,2,1,9,5,3,4,8],
        [1,9,8,3,4,2,5,6,7],
        [8,5,9,7,6,1,4,2,3],
        [4,2,6,8,5,3,7,9,1],
        [7,1,3,9,2,4,8,5,6],
        [9,6,1,5,3,7,2,8,4],
        [2,8,7,4,1,9,6,3,5],
        [3,4,5,2,8,6,1,7,9],

    ]

    
]
function randint(a,b)
{
    b=b+1;
    return a+(Math.floor(Math.random()*(b-a)))
}
function extract_column(grid, col_index)
{
    if (0<=col_index && col_index<=8)
    {
        let col = [];
        for (let j = 0; j < 9; j++) col.push(grid[j][col_index])
        return col;
    }
    return []
}

function extract_square(grid, square_index)
{
    const line_start = Math.floor(square_index/3)*3
    const col_start = 3*(square_index%3)
    let square = [];
    for (let i = 0; i <3; i++)
    {
        square.push(grid[line_start+i].slice(col_start, col_start+3))
    }
    return square
    
}

function linearize_square(square)
{
    return square[0].concat(square[1]).concat(square[2])
}

function  checkUnit(unit)
{
    let tab = [0,0,0,0,0,0,0,0,0]
    for (let i=0; i<9; i++)
    {
        if (unit[i]!==0)
        {
        tab[unit[i]-1] += 1;
        if (tab[unit[i]-1]>1) return false;
        }
    }
    return true;
}

export function verify_grid(grid)
{ 
    if (grid.length !== 9) return false;
    for (let  i = 0; i<9; i++)
    {
        let line = grid[i];
        let column = extract_column(grid, i);
        let square = linearize_square(extract_square(grid, i));
        if (!checkUnit(line)){console.log("verify line : ",i, line,);return false;}
        if (!checkUnit(column)) {console.log("verify col : ",i, column);return false;}
        if (!checkUnit(square)) {console.log("verify sq : ",i,square);return false;}
        
    }
    return true
}

function swap_lines(grid, i,j)
{
    if (Math.abs(i-j)<3 && Math.floor(i/3)===Math.floor(j/3))
    {
        const line_i = grid[i];
        const line_j = grid[j];
        grid[i] = line_j;
        grid[j] = line_i;
    }
    return grid;
}



function swap_columns(grid,i, j)
{
        const column_i = extract_column(grid, i)
        const column_j = extract_column(grid, j)
        for (let k=0; k<9; k++) 
        {
            grid[k][i] = column_j[k];
            grid[k][j] = column_i[k];
        }
    
}
function swap_at_random(grid, type)
{
    let times = randint(0,6)//On échange des lignes de 0 à 6 fois
    for (let i = 0; i < times; i++)
    {
        let block = randint(0,2);
        let line1 =randint(0,2)+block*3
        let line2 = randint(0,2)+block*3
        if (type==="lines") swap_lines(grid, line1, line2);
        if (type==="columns") swap_columns(grid, line1, line2)
    }
}

function invert_lines(grid)
{
    for (let i = 0; i<4; i++)
    {
        const line = grid[i]
        grid[i] = grid[8-i];
        grid[8-i] = line
    }
}

function invert_columns(grid)
{
    for (let i = 0; i <4; i++)
    {
        swap_columns(grid, i, 8-i)
    }
}
function transposeGrid(grid) {
	// rotate grid in place
	for (let i = 0; i < grid.length; i++) {
		for (let j = i; j < grid.length; j++) {
			[grid[i][j], grid[j][i]] = [grid[j][i], grid[i][j]];
		}
	}
}

function swap_numbers(grid, n1, n2)
{
    if (n1!==n2)
    {
    for (let i = 0; i<9; i++)
    {
        for (let j = 0; j<9; j++)
        {
            if (grid[i][j] === n1) grid[i][j] = n2
            else if (grid[i][j] === n2) grid[i][j] = n1
        }
    }}
}

function swap_numbers_at_random(grid)
{
    const n1 = randint(1,9), n2 = randint(1,9);
    swap_numbers(grid, n1, n2)
}

export function generate_random_full_grid()
{
    const grid = grids[randint(0,grids.length-1)];
    swap_at_random(grid, "lines")
    swap_at_random(grid, "columns")
    let times = randint(0,4)
    for (let i = 0; i<times; i++) swap_numbers_at_random(grid)
    if (randint(0,1)) invert_lines(grid)
    if (randint(0,1)) invert_columns(grid);
    if (randint(0,1)) transposeGrid(grid)
    return grid;
}

export function generate_playable_grid(grid, level)
{
    let proba;
    switch(level)
    {
        case 0:
            proba = 0.5
            break;
        case 1:
            proba = 0.65
            break;
        case 2:
            proba = 0.82;
            break;
        default:
            proba = 0.82
            break;
    }
    const grid2 = grid.map(line => [].concat(line));
    for (let i = 0; i<9; i++)
    {
        for (let j = 0; j<9; j++)
        {
            if (Math.random()<proba) grid2[i][j]=0;
        }
    }
    return grid2;
}

export function gridsAreEqual(grid1, grid2)
{
    for (let i = 0; i < grid1.length; i++)
    {
        for (let j = 0; j<grid1.length; j++) if (grid1[i][j]!==grid2[i][j] && grid1[i][j]!==0 &&grid2[i][j]!==0) return false
    }
    return true;
}

