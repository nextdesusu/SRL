const IB = require("./InterfaceBuilder");

const startGame = (body, width, height) => {
  const Interface = new IB(body, width, height);
  const ctx = Interface.ctx;
  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "black";
  ctx.fillRect(30, 100, 60, 200);
};

module.exports = startGame;
