export default class Tile {
    constructor(blocked, tId, expolred = false,) {
        this.blocked = blocked;
        this.textureId = tId;
        this.explored = expolred;

        this.actorOn = null;
        this.itemsOn = null;
        this.objectOn = null;
    }
}