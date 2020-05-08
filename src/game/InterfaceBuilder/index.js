export default class InterfaceBuilder {
  constructor(body, interfaceThemes) {
    this._BODY = body;
    this._DIV = document.createElement("div");
    this._themes = interfaceThemes;
    this._dialogue = null;
  }

  get newDiv() {
    return this._DIV.cloneNode();
  }

  get dialogue() {
    return this._dialogue;
  }

  createDialogue(theme) {
    const dialogueContainer = this.newDiv;
    dialogueContainer.className = "interface-dialogue";
    this._BODY.appendChild(dialogueContainer);
    this._dialogue = dialogueContainer;
    this._dialogue.style.backgroundColor = this._themes[theme];
  }

  _resizeDialogue(width, height) {
    const oneThirdOfScreen = Math.ceil(height / 3);
    this._dialogue.style.width = `${width}px`;
    this._dialogue.style.top = `${oneThirdOfScreen * 2}px`;
    this._dialogue.style.height = `${oneThirdOfScreen}px`;
  }

  setSize(width, height) {
    this._resizeDialogue(width, height);
  }
}
