const BLOCKS = [
    [
        [0,1,0],
        [0,1,0],
        [0,1,0],
        [0,1,0],
    ],
    [
        [0,0,2],
        [2,2,2],
        [0,0,0],
    ],
    [
        [3,0,0],  
        [3,3,3],
        [0,0,0],
    ],
    [
        [0,4,4],
        [4,4,0],
    ],
    [
        [5,5,0],
        [0,5,5],
    ],
    [
        [0,6,0],
        [6,6,6],
        [0,0,0],
    ],
    [
        [7,7],
        [7,7],
    ],
    
];

class BlocksFactory {
    static getEmpty() {
        return [
            []
        ];
    }

    static getBlock(value) {
        return BLOCKS[value];
    }
}

export default BlocksFactory;