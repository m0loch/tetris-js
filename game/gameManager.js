import BlocksFactory from "./blocksFactory";

class GameManager {
    constructor() {
        this.lastBlock = -1;
    }

    start = () => {
        this.lastBlock = (++this.lastBlock) % 7;
        return BlocksFactory.getBlock(this.lastBlock);
    }    
}

export default GameManager;