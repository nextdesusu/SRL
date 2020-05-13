export default class Tile {
    constructor(blocked, tId, expolred = false,) {
        this.blocked = blocked;
        this.textureId = tId;
        this.explored = expolred;
    }
}