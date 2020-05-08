export default class FabricList {
    constructor() {
        this._list = [];
    }
    add(item) {
        this._list.push(item);
    }
    remove(toRemove) {
        console.log("rmoving", toRemove);
        this._list = this._list.filter((item) => item !== toRemove);
    }
    get all() {
        return this._list;
    }
}