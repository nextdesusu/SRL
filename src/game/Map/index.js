import Tile from "./Tile";
import Rect from "./Rect";
import { Item } from "../Item";

export default class Map {
  constructor() {
    this._map = null;
  }

  deleteActor(actor) {
    const { x, y } = actor.mapRepr;
    const tile = this._map[x][y];
    tile.actorOn = null;
  }

  placeActor(actor) {
    const { x, y } = actor.mapRepr;
    const tile = this._map[x][y];
    if (tile.actorOn === null) {
      tile.actorOn = actor;
    }
  }

  addItem(item) {
    const { x, y } = item.mapRepr;
    const tile = this._map[x][y];
    if (tile.itemsOn === null) {
      tile.itemsOn = [item];
    } else {
      tile.itemsOn.push(item);
    }
  }

  deleteItem(item) {
    const { x, y } = item.mapRepr;
    const tile = this._map[x][y];
    if (tile.itemsOn.length > 1) {
      tile.itemsOn = tile.itemsOn.filter((current) => current !== item);
    } else {
      tile.itemsOn = null;
    }
  }

  deleteAllItems(x, y) {
    const tile = this._map[x][y];
    tile.itemsOn = null;
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

  isBlocked(x, y) {
    const tile = this._map[x][y];
    const actorBlocks = tile.actorOn ? tile.actorOn.blocks : false;
    return tile.blocked && actorBlocks;
  }

  itemsAt(x, y) {
    return this._map[x][y].itemsOn;
  }

  actorAt(x, y) {
    return this._map[x][y].actorOn;
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
