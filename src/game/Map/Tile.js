export default class Tile {
    constructor(blocked, blockSight = null) {
        this.blocked = blocked;
        
        if (blockSight === null) {
            this.blockSight = blocked;
        } else {
            this.blockSight = blockSight;
        }

        this.explored = false;
        this.textureId = null;
    }

    set texture(textureId) {
        this.textureId = textureId;
    }
}