export default class Logger {
    constructor(logBoard, textNode) {
        this.logBoard = logBoard;
        this.textNode = textNode;
    }

    log(text, color = 'gray') {
        const newTextNode = this.textNode.cloneNode();
        newTextNode.style.color = color;
        newTextNode.innerText = text;
        this.logBoard.appendChild(newTextNode);
    }

    say(text) {
        this.log(text, 'black');
    }

    battle(text) {
        this.log(text, 'red');
    }

    congrat(text) {
        this.log(text, 'green');
    }

    warning(text) {
        this.log(text, 'yellow');
    }
}
