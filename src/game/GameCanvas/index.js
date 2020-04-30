import "./canvas.css";

export default class GameCanvas {
  constructor(body, width, height) {
    this._width = 0;
    this._height = 0;
    this._CANVAS = this._createCanvas(body, width, height);
    this.setSize(width, height);
  }

  get ctx() {
    return this._CANVAS.getContext("2d");
  }

  refresh() {
    this.ctx.clearRect(0, 0, this._width, this._height);
  }

  _createCanvas(body, width, height) {
    if (this._CANVAS === undefined) {
      const CANVAS = document.createElement("canvas");
      CANVAS.id = "main-canvas";
      CANVAS.width = width;
      CANVAS.height = height;
      body.appendChild(CANVAS);
      return CANVAS;
    } else {
      throw Error("Main canvas already exists!");
    }
  }

  setSize(width, height) {
    this._width = width;
    this._height = height;
    this._CANVAS.style.width = `${width}px`;
    this._CANVAS.style.height = `${height}px`;
  }

  drawMap(map, mapTiles) {
    const length = map.length;
    let yShift = 0;
    const ctx = this.ctx;
    for (let x = 0; x < length; x++) {
      let xShift = 0;
      for (let y = 0; y < length; y++) {
        if (map._map[x][y].blocked) {
          ctx.drawImage(mapTiles.wall, xShift, yShift, 32, 32);
        } else {
          ctx.drawImage(mapTiles.ground, xShift, yShift, 32, 32);
        }
        xShift += 32;
      }
      yShift += 32;
    }
  }
}
