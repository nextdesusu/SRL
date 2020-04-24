import "./canvas.css";

export default class GameCanvas {
  constructor(body, width, height) {
    this._CANVAS = this._createCanvas(body);
    this._CANVAS.width = width;
    this._CANVAS.height = height;
    this.toScreenSize();
  }

  get ctx() {
    return this._CANVAS.getContext("2d");
  }

  _createCanvas(body) {
    if (this._CANVAS === undefined) {
      const CANVAS = document.createElement("canvas");
      CANVAS.id = "main-canvas";
      body.appendChild(CANVAS);
      return CANVAS;
    } else {
      throw Error("Main canvas already exists!");
    }
  }

  toScreenSize(width, height) {
    this._width = width;
    this._height = height;
    this._CANVAS.style.width = `${width}px`;
    this._CANVAS.style.height = `${height}px`;
  }
}
