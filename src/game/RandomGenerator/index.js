export default class RandomGenerator {
    constructor(seed) {
        this._seed = seed;
        this._a = 45;
        this._c = 21;
        this._m = 67;
    }

    generate(max){
        const { _seed, _a, _c, _m } = this;
        const newSeed = (_a * _seed + _c) % _m;
        this._seed = newSeed;

        const multiplier = 33;
        return (newSeed * multiplier) % max;
    }
}