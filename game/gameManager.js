import BlocksFactory from "./blocksFactory";

function calculateBoard(field, player) {
    const board = [];
    field.forEach(row => board.push(row.slice()));

    let yCorrection = (player.shape[0].findIndex(el => el > 0) > -1) ? 0 : -1;

    player.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell > 0) {
                board[player.y + y + yCorrection][player.x + x] = cell;
            }
        });
    });

    return board;
}

class GameManager {
    constructor(gridRef) {
        this.lastBlock = -1;
        this.player = {
            shape: undefined,
            x: 0,
            y: 0,
        }

        // TODO: this should be an object interface, not the whole component
        this.gridRef = gridRef;
    }

    start = () => {
        // Concepts:
        // Player = the piece that the player is actually controlling
        // Field = the full game field, containing blocks from previous turns but not the current piece
        // Board = the result of the merging the previous two values that will be presented to the user
        let state = {...this.gridRef.state};

        if (this.lastBlock === -1) {
            // Start a new game
            // maybe a countdown would be a good thing here
            state.field = this.getEmptyField(state.width, state.height);
        }

        // Temporary: this should happen only when the old piece has been consumed
        this.setPlayer(
            this.getNextBlock(),
            state.width);

        state.board = calculateBoard(state.field, this.player);

        state.next = this.getNextBlock();
        this.gridRef.setState(state);
    }

    getEmptyField = (width, height) => {
        return Array.from(Array(height), () => new Array(width).fill(0))
    }

    setPlayer = (block, fieldWidth) => {
        this.player = {
            shape: block,
            x: Math.ceil((fieldWidth - block[0].length) / 2),
            y: 0,
        };
    }

    getNextBlock = () => {
        // TODO: right now we're cycling through the blocks, in the future this will be a double-shufflebug random

        this.lastBlock = (++this.lastBlock) % 7;
        return BlocksFactory.getBlock(this.lastBlock);
    }
}

export default GameManager;