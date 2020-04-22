const IB = require("./InterfaceBuilder");

const startGame = (body, width, height) => {
  const Interface = new IB(body, width, height);
  const Canvas = Interface.getCanvasInstance();
  const ctx = Canvas.getContext("2d");
  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, width, height);
};

module.exports = startGame;
