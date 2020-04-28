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

  async loadTiles(PathToTiles, requiredNamesSet) {
    const fpath = path.join(this._appPath, ...PathToTiles);
    return new Promise((resolve, reject) => {
      fs.readdir(fpath, (err, files) => {
        if (err) {
          reject(err);
        }
        for (const fileName of files) {
          const filteredName = fileName.replace(/.png/, "");
          if (requiredNamesSet.has(filteredName)) {
            const pathToFile = path.join(fpath, fileName);
            const loaded = fs.readFileSync(pathToFile);
            const base64 = loaded.toString("base64");
            const _img = new Image();
            _img.src = `data:image/png;base64,${base64}`;
            this.setTile(filteredName, _img);
          }
        }
        resolve(true);
      });
    });
  }
}
