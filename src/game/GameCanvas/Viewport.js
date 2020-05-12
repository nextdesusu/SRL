export default class Viewport {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    scrollTo(x, y) {
        this.x = x - this.w * 0.5;
        this.y = y - this.h * 0.5;
    }

    resize(w, h) {
        this.w = w;
        this.h = h;
    }
}