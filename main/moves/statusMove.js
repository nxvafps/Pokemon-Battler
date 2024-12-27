const Move = require("./move.js");

class StatusMove extends Move {
  constructor(name, type, power, accuracy, pp) {
    super(name, type, "status", power, accuracy, pp);
  }
}

module.exports = StatusMove;
