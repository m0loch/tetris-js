const CLEARED_ROWS_COEFFICIENT = [
    40,
    100,
    300,
    1200,
]

const LINES_FOR_NEW_LEVEL = 10;

class ScoreManager {
    constructor() {
        this.resetScore();
    }

    resetScore = () => {
        this.score = 0;
        this.level = 1;
        this.linesForCurrLevel = 0;
    }

    addtoScore = (clearedRows) => {
        if (clearedRows < 1) {
            return;
        }

        // Updates score
        this.score += this.level * CLEARED_ROWS_COEFFICIENT[clearedRows - 1];

        // Updates level
        this.linesForCurrLevel += clearedRows;
        if (this.linesForCurrLevel >= LINES_FOR_NEW_LEVEL) {
            this.linesForCurrLevel -= LINES_FOR_NEW_LEVEL;
            this.level++;
        }
    }

    getCurrentProgress = () => {
        return this.linesForCurrLevel * 100 / LINES_FOR_NEW_LEVEL;
    }
}

export default ScoreManager;