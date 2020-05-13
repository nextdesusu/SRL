import Tile from "./Tile";
import Rect from "./Rect";

export default class Map {
  constructor() {
    this._map = null;
  }

  get size() {
    if (this._map === null) {
      throw Error("Map is not generated or loaded!");
    }
    return this._map.length;
  }

  isBlocked(x, y) {
    return this._map[x][y].blocked;
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
