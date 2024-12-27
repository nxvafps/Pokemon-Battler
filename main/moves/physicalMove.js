const Move = require("./move");

class PhysicalMove extends Move {
  constructor(name, type, power, accuracy, pp) {
    super(name, type, "physical", power, accuracy, pp);
  }
}

module.exports = PhysicalMove;
