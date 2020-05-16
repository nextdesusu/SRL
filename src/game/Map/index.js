import Tile from "./Tile";
import Rect from "./Rect";

export default class Map {
  constructor() {
    this._map = null;
    this._actors = [];
  }

  get actors() {
    return this._actors;
  }

  deleteActor(toDelete) {
    this._actors = this._actors.filter((actor) => actor !== toDelete);
  }

  addActor(actor) {
    this._actors.push(actor);
  }

  get size() {
    if (this._map === null) {
      throw Error("Map is not generated or loaded!");
    }
    return this._map.length;
  }

  isWallAt(x, y) {
    return this._map[x][y].blocked;
  }

  isActorAt(x, y) {
    for (const { mapRepr } of this._actors) {
      if (mapRepr.blocks && mapRepr.x === x && mapRepr.y === y) {
        return true;
      }
    }
    return false;
  }

  isItemAt(x, y) {
    return false;
  }

  isObjectAt(x, y) {
    return false;
  }

  generateMap(size) {
    const _map = this.mapFilledWithTiles(size);
    this.setBorders(_map, size);

    this._map = _map;
  }

  mapFilledWithTiles(size) {
    const getTilesRow = () =>
      new Array(size).fill(null).map(() => new Tile(false, 0));
    return new Array(size).fill(null).map(getTilesRow);
  }

  setBorders(map, size) {
    for (let i = 0; i < size; i++) {
      map[i][0].blocked = true;
      map[i][size - 1].blocked = true;
      map[0][i].blocked = true;
      map[size - 1][i].blocked = true;

      map[i][0].textureId = 1;
      map[i][size - 1].textureId = 1;
      map[0][i].textureId = 1;
      map[size - 1][i].textureId = 1;
    }
  }
}
