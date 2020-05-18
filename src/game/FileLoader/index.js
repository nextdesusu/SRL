import { remote } from "electron";
const fs = remote.require("fs");
const path = remote.require("path");

export default class FileLoader {
  constructor() {
    this._appPath = remote.app.getAppPath();
    this._loaded = {
      tiles: {},
      sounds: {},
    };
  }

  setTile(tileName, value) {
    this._loaded.tiles[tileName] = value;
  }

  getTile(tileName) {
    if (tileName in this._loaded.tiles) {
      return this._loaded.tiles[tileName];
    }
    throw Error(`${tileName} is not loaded`);
  }

  get currentMapTiles() {
    return this._loaded.tiles;
  }

  loadTiles(PathToTiles, requiredNamesSet) {
    const fpath = path.join(this._appPath, ...PathToTiles);
    for (const fileName of requiredNamesSet) {
      const pathToFile = path.join(fpath, `${fileName}.png`);
      const loaded = fs.readFileSync(pathToFile);
      const base64 = loaded.toString("base64");
      const _img = new Image();
      _img.src = `data:image/png;base64,${base64}`;
      this.setTile(fileName, _img);
    }
  }

  loadTileSet(PathToTiles, name) {
    const fpath = path.join(this._appPath, ...PathToTiles, `${name}.png`);
    console.log("loadTileSet", fpath)
    const loaded = fs.readFileSync(fpath);
    const base64 = loaded.toString("base64");
    const _img = new Image();
    _img.src = `data:image/png;base64,${base64}`;
    this.setTile(name, _img);
  }
}
