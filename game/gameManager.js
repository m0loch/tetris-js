import BlocksFactory from "./blocksFactory";
import ScoreManager from "./scoreManager";
import ShuffleBag from "./shuffleBag";

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
            if ((cell > 0) && (board[player.y + y][player.x + x] === 0)) {
                board[player.y + y][player.x + x] = cell;
            }
        });
    });

    return board;
}

function removeFullLines(board) {
    let width = board[0].length;

    for (let y = board.length - 1; y >= 0; y--) {
        let isFullRow = true;

        for (let x = 0; x < width; x++) {
            if (board[y][x] === 0) {
                isFullRow = false;
                continue;
            }
        }

        if (isFullRow) {
            /* NB: we're not replacing the removed lines;
             * that will be handled by update()
             * which will also count the missing lines to calculate the score
             */
            board.splice(y, 1);
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

/* Middle-function in order to fix I's rotation */
/* this is also where kicks will should be implemented,
/* provided that's ever going to happen */
function rotatePiece(player, clockWise) {
    player.shape = rotateMatrix(player.shape, clockWise);

    if (player.shape.length === 1) {
        player.x -= 1;
        player.y += 1;
    } else if (player.shape.length === 4) {
        player.x += 1;
        player.y -= 1;
    }
}

class GameManager {
    constructor(gridRef) {
        this.scoreManager = new ScoreManager();
        this.randomizer = new ShuffleBag();
        this.resetPlayer();

        // We're passing a reference to the original component
        // in order to access its setState() method
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

    setPlayer = (block, fieldWidth) => {
        this.player = {
            shape: block,
            x: Math.ceil((fieldWidth - block[0].length) / 2),
            y: 0,
            isSet: true,
        };
    }

    start = () => {
        // Concepts:
        // Player = the piece that the player is actually controlling
        // Field = the full game field, containing blocks from previous turns but not the current piece
        // Board = the result of the merging the previous two values that will be presented to the user
        this.lastBlock = -1;

        this.scoreManager.resetScore();
        this.setPlayer(
            this.getNextBlock(),
            this.gridRef.state.width);

        this.field = this.getEmptyField(this.gridRef.state.width, this.gridRef.state.height);

        let state = {...this.gridRef.state};
        state.next = this.getNextBlock();
        state.gameOver = false;
        state.started = true;
        state.paused = false;
        this.pauseStart = this.pauseEnd = undefined;
        
        this.gridRef.setState(state);

        this.update();

        // Starts the game loop
        this.dropCounter = 0;
        this.lastDrop = undefined;
        requestAnimationFrame(this.gameLoop);
    }

    gameLoop = (time) => {
        if (this.lastDrop === undefined) {
            this.lastDrop = time;
        }

        let deltaTime = time - this.lastDrop;

        if (!this.gridRef.state.paused && (this.pauseStart !== undefined)) {
            deltaTime -= this.pauseEnd - this.pauseStart;
            this.pauseStart = this.pauseEnd = undefined;
        }

        this.dropCounter += deltaTime;
        if (this.dropCounter > this.scoreManager.getDropInterval()) {
            this.dropPiece();
        }
    
        this.lastDrop = time;

        if (!this.gridRef.gameOver && !this.gridRef.state.paused) {
            requestAnimationFrame(this.gameLoop);
        }
    }

    setPause = (value) => {
        let state = {...this.gridRef.state};
        state.paused = value;
        this.gridRef.setState(state);
    }

    update = () => {
        let state = {...this.gridRef.state};

        if (!this.player.isSet) {
            this.setPlayer(
                state.next,
                state.width);

            state.next = this.getNextBlock();

            if (checkCollision(this.field, this.player)) {
                state.gameOver = true;
            }
        }

        if (!state.gameOver) {
            // Updates the score and refills removed lines
            this.scoreManager.addtoScore(state.height - this.field.length);
            state.score = this.scoreManager.score;
            state.level = this.scoreManager.level;
            state.levelProgress = this.scoreManager.getCurrentProgress();

            while (this.field.length < state.height) {
                this.field.unshift(getEmptyRow(state.width));
            }

            state.field = this.field;
        }

        state.board = calculateBoard(this.field, this.player);

        this.gridRef.setState(state);
    }

    getEmptyField = (width, height) => {
        return Array.from(Array(height), () => getEmptyRow(width));
    }

    getNextBlock = () => {
        // TODO: lastBlock should be an array of 3 pieces

        this.lastBlock = this.randomizer.getNext();
        return BlocksFactory.getBlock(this.lastBlock);
    }

    // PLAYER INPUT
    inputEnabled = () => (this.player.isSet && !this.gridRef.state.gameOver && !this.gridRef.state.paused);

    moveLeft = () => {
        if (!this.inputEnabled()) {
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
        if (!this.inputEnabled()) {
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
        if (!this.inputEnabled()) {
            return;
        }

        this.player.y++;

        if (checkCollision(this.field, this.player)) {
            this.player.y--;
            this.field = removeFullLines(calculateBoard(this.field, this.player));
            this.resetPlayer();
        }

        this.dropCounter = 0;
        this.update();
    }

    rotateLeft = () => {
        if (!this.inputEnabled()) {
            return;
        }

        rotatePiece(this.player, false);

        if (!checkCollision(this.field, this.player)) {
            this.update();
        } else {
            rotatePiece(this.player, true);
        }
    }

    rotateRight = () => {
        if (!this.inputEnabled()) {
            return;
        }

        rotatePiece(this.player, true);

        if (!checkCollision(this.field, this.player)) {
            this.update();
        } else {
            rotatePiece(this.player, false);
        }
    }

    pauseGame = () => {
        if (!this.gridRef.state.started || this.gridRef.state.gameOver) {
            this.start();
        } else {
            if (!this.gridRef.state.paused) {
                this.pauseStart = Date.now();
                this.setPause(true);
            } else {
                this.setPause(false);
                this.pauseEnd = Date.now();
                requestAnimationFrame(this.gameLoop)
            }
        }
    }
}

export default GameManager;