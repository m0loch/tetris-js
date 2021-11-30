const baseCfg = [0, 1, 2, 3, 4, 5, 6];

class ShuffleBag {
    constructor() {
        this.reset();
    }

    reset = () => {
        let values = [...baseCfg];
        this.bag = [];

        while (values.length > 0) {
            this.bag.push(...values.splice(Math.floor(Math.random() * values.length), 1));
        }
    }

    getNext = () => {
        // If the bag is empty, regenerates it.
        if (this.bag.length < 1) {
            this.reset();
        }

        // Returns the first element of the bag,
        // taking it out of the structure.
        return this.bag.splice(0, 1);
    }
}

export default ShuffleBag;