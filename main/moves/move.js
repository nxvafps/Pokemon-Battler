class Move {
  constructor(name, type, category, power, accuracy, pp) {
    this.name = name;
    this.type = type;
    this.category = category;
    this.power = this.category === "status" ? 0 : power;
    this.accuracy = accuracy;
    this.pp = {
      current: pp,
      max: pp,
    };
  }

  useMove() {
    if (this.pp.current > 0) {
      this.pp.current -= 1;
    }
  }
}

module.exports = Move;
