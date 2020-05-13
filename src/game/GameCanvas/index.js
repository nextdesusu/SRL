import Viewport from "./Viewport";
import { TILE_SIZE } from "../consts/File";

export default class GameCanvas {
  constructor(body, width, height) {
    this._CANVAS = this._createCanvas(body, width, height);
    this._ctx = this._CANVAS.getContext("2d");
    this._ctx.imageSmoothingEnabled = false;
    this._shiftX = 0;
    this._shiftY = 0;

    this._cursorStartX = 0;
    this._cursorStartY = 0;
    this.viewport = new Viewport(0, 0, width, height);
    this.setSize(width, height);
  }

  get ctx() {
    return this._ctx;
  }

  get width() {
    return this._CANVAS.width;
  }

  get height() {
    return this._CANVAS.height;
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
    console.log("setting size", width, ":", height)
    this._CANVAS.style.width = `${width}px`;
    this._CANVAS.style.height = `${height}px`;
  }
}
