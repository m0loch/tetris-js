class BlocksFactory {
    static getEmpty() {
        return {
            shape: [
                []
            ]
        };
    }

    // this will return a random shapes selected from the pool
    static getRandomBlock() {
        return {
            shape: [
                [0,0,0,0],
                [1,1,1,1],
                [0,0,0,0],
                [0,0,0,0],
            ]
        };
    }
}

export default BlocksFactory;