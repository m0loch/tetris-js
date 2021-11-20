import BlocksFactory from "./blocksFactory";

function getEmptyRow(width) {
    return new Array(width).fill(0);
}

function checkCollision(field, player) {

    for (let y = 0; y < player.shape.length; y++) {
        const row = player.shape[y];
        
        for (let x = 0; x < row.length; x++) {
            const cell = row[x];

            if (cell === 0) {
                // We only need to check filled cells
                continue;
            }

            if ((field[player.y + y]  === undefined)                  // Vertical check for boundaries
                || (field[player.y + y][player.x + x] === undefined)  // Horizontal check for boundaries
                || (field[player.y + y][player.x + x] > 0)) {         // Check that the field is empty
                return true;
            }
        }
    }

    return false;
}

function calculateBoard(field, player) {
    const board = [];
    field.forEach(row => board.push(row.slice())); // -> Shallow copy of row's elements

    player.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell > 0) {
                board[player.y + y][player.x + x] = cell;
            }
        });
    });

    return board;
}

function removeFullLines(board) {
    let width = board[0].length;

    for (let y = 0; y < board.length; y++) {
        let isFullRow = true;

        for (let x = 0; x < width; x++) {
            if (board[y][x] === 0) {
                isFullRow = false;
                continue;
            }
        }

        if (isFullRow) {
            board.splice(y, 1);
            board.unshift(getEmptyRow(width));
        }
    }

    return board;
}

function rotateMatrix(matrix, clockWise) {
    const result = [];
    matrix.forEach((row, y) => {
        row.forEach((item, x) => {
            if (y === 0) {
                if (clockWise) {
                    result.push([item]);
                } else {
                    result.unshift([item]); // Adds at the beginning of the array
                }
            } else {
                if (clockWise) {
                    result[x].unshift(item);
                } else {
                    result[row.length - 1 - x].push(item);
                }
            }
        });
    });

    return result;
}

class GameManager {
    constructor(gridRef) {
        this.lastBlock = -1;
        this.resetPlayer();

        // TODO: this should be an object interface, not the whole component
        this.gridRef = gridRef;
    }

    resetPlayer = () => {
        this.player = {
            shape: undefined,
            x: 0,
            y: 0,
            isSet: false,
        }

    }

    start = () => {
        // Concepts:
        // Player = the piece that the player is actually controlling
        // Field = the full game field, containing blocks from previous turns but not the current piece
        // Board = the result of the merging the previous two values that will be presented to the user

        if (this.lastBlock === -1) {
            // Temporary: this should happen only when the old piece has been consumed
            this.setPlayer(
                this.getNextBlock(),
                this.gridRef.state.width);

            this.gridRef.state.next = this.getNextBlock();
        }

        this.field = this.getEmptyField(this.gridRef.state.width, this.gridRef.state.height);

        this.update(true);
    }

    update = (newPiece = false) => {
        let state = {...this.gridRef.state};

        if (!this.player.isSet) {
            this.setPlayer(
                state.next,
                state.width);

            state.next = this.getNextBlock();
        }

        state.field = this.field;

        // TODO: check here for game over
        state.board = calculateBoard(this.field, this.player);

        this.gridRef.setState(state);
    }

    getEmptyField = (width, height) => {
        return Array.from(Array(height), () => getEmptyRow(width));
    }

    setPlayer = (block, fieldWidth) => {
        this.player = {
            shape: block,
            x: Math.ceil((fieldWidth - block[0].length) / 2),
            y: 0,
            isSet: true,
        };
    }

    getNextBlock = () => {
        // TODO: right now we're cycling through the blocks, in the future this will be a double-shufflebag random

        this.lastBlock = (++this.lastBlock) % 7;
        return BlocksFactory.getBlock(this.lastBlock);
    }

    // PLAYER INPUT
    moveLeft = () => {
        if (!this.player.isSet) {
            return;
        }

        this.player.x--;

        if (!checkCollision(this.field, this.player)) {
            this.update();
        } else {
            this.player.x++;
        }
    }

    moveRight = () => {
        if (!this.player.isSet) {
            return;
        }

        this.player.x++;        

        if (!checkCollision(this.field, this.player)) {
            this.update();
        } else {
            this.player.x--;
        }
    }

    dropPiece = () => {
        if (!this.player.isSet) {
            return;
        }

        this.player.y++;

        if (!checkCollision(this.field, this.player)) {
            this.update();
        } else {
            this.player.y--;
            this.field = removeFullLines(calculateBoard(this.field, this.player));
            this.resetPlayer();
            this.update();
        }
    }

    rotateLeft = () => {
        if (!this.player.isSet) {
            return;
        }

        this.player.shape = rotateMatrix(this.player.shape, false);

        if (!checkCollision(this.field, this.player)) {
            this.update();
        } else {
            this.player.shape = rotateMatrix(this.player.shape, true);
        }
    }

    rotateRight = () => {
        if (!this.player.isSet) {
            return;
        }

        this.player.shape = rotateMatrix(this.player.shape, true);

        if (!checkCollision(this.field, this.player)) {
            this.update();
        } else {
            this.player.shape = rotateMatrix(this.player.shape, false);
        }
    }

    pauseGame = () => {
        console.log('nothing to be done atm')
    }
}

export default GameManager;