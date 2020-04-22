class InterfaceBuilder {
    constructor(body, width, height) {
        this._BODY = body;
        this._width = width;
        this._height = height;
        this._CANVAS = this.createCanvas();

        this.bodySetOnResize();
    }

    bodySetOnResize() {
        window.addEventListener('resize', () => {
            const { width, height } = window.screen;
            this._width = width;
            this._height = height;
            this._CANVAS.style.width = `${width}px`;
            this._CANVAS.style.height = `${height}px`;
        });
    }

    get ctx() {
        return this._CANVAS.getContext("2d");
    }

    createCanvas() {
        if (this._CANVAS === undefined) {
            const CANVAS = document.createElement('canvas');
            CANVAS.width = this._width;
            CANVAS.height = this._height;
            this._BODY.appendChild(CANVAS);
            return CANVAS;
        } else {
            throw Error("canvas already exists!");
        }
    }
}

module.exports = InterfaceBuilder;