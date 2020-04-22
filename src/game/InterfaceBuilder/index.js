class InterfaceBuilder {
    constructor(body, width, height) {
        this._BODY = body;
        this._CANVAS = null;
        this._width = width;
        this._height = height;
    }

    getCanvasInstance() {
        if (this._CANVAS === null) {
            const CANVAS = document.createElement('canvas');
            CANVAS.width = this._width;
            CANVAS.height = this._height;
            this._BODY.appendChild(CANVAS);
            this._CANVAS = CANVAS;
            console.log("canvas created", CANVAS);
        }
        return this._CANVAS;
    }
}

module.exports = InterfaceBuilder;