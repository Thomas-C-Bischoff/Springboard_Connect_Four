const HEIGHT = 6;
const WIDTH = 7;

let playing = true;
let board = [];
let currPlayer = 1;

function makeBoard()
{
    board = [...Array(HEIGHT)].map(e => Array(WIDTH));
}

function makeHTMLBoard()
{
    const htmlBoard = document.querySelector("#board");
    // **********************************************************************************************************
    // Creates the Top of the Board Where the Pieces are Dropped From Base on the WIDTH Variable
    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");
    top.addEventListener("click", handleClick);
    for (let x = 0; x < WIDTH; x++)
    {
        const headCell = document.createElement("td");
        headCell.setAttribute("id", x);
        top.append(headCell);
    }
    htmlBoard.append(top);
    // **********************************************************************************************************
    // Creates the Positions on the Board that Will Contain the Players' Pieces the Size is Based on the WIDTH &
    // HEIGHT Variables
    for (let y = 0; y < HEIGHT; y++)
    {
        const row = document.createElement("tr");
        for (let x = 0; x < WIDTH; x++)
        {
            const cell = document.createElement("td");
            cell.setAttribute("id", `${y}-${x}`);
            row.append(cell);
        }
        htmlBoard.append(row);
    }
    // **********************************************************************************************************
}

function findSpotForCol(x)
{
    if (board[HEIGHT - 1][x] === undefined)
    {
        return HEIGHT - 1;
    }
    else
    {
        for (let row = 1; row < HEIGHT; row++)
        {
            if ((board[row][x] != undefined) && (board[row - 1][x] === undefined))
            {
                return row - 1;
            }
        }
    }
    return null;
}

function placeInTable(y, x)
{
    const cell = document.getElementById(`${y}-${x}`);
    if (cell != undefined)
    {
        board[y][x] = currPlayer;
        const piece = document.createElement("div");
        piece.classList.add("piece");
        if (currPlayer === 1)
        {
            piece.classList.add("player1");
        }
        else
        {
            piece.classList.add("player2");
        }
        cell.append(piece);
    }
}

function endGame(msg)
{
    playing = false;
    alert(msg);
    document.location.reload(true);
}



function handleClick(evt)
{
    if (playing)
    {
        const x = +evt.target.id;
        const y = findSpotForCol(x);
        if (y === null)
        {
            return;
        }
        placeInTable(y,x);
        if (checkForWin())
        {
            return endGame(`Player ${currPlayer} Won!`);
        }
        else
        {
            for (row of board)
            {
                if (!row.includes(undefined))
                {
                    endGame(`Players Tied.`)
                }
            }
        }
        currPlayer = (currPlayer === 1) ? 2 : 1;
    }
}

function checkForWin()
{
    function _win(cells)
    {
        return cells.every(
            ([y, x]) =>
            y >= 0 &&
            y < HEIGHT &&
            x >= 0 &&
            x < WIDTH &&
            board[y][x] === currPlayer
        );
    }
    // **********************************************************************************************************
    // Handles Checking for a Player Win Based on the Predefined Conditions of a Horizontal/Vertial/Diagonal Win
    for (let y = 0; y < HEIGHT; y++) 
    {
        for (let x = 0; x < WIDTH; x++) 
        {
          const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
          const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
          const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
          const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
          if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) 
          {
            return true;
          }
        }
    }
    // **********************************************************************************************************
}

makeBoard();
makeHTMLBoard();