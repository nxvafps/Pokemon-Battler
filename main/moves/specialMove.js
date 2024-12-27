const Move = require("./move.js");

class SpecialMove extends Move {
  constructor(name, type, power, accuracy, pp) {
    super(name, type, "special", power, accuracy, pp);
  }
}

module.exports = SpecialMove;
