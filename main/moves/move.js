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

  useMove(attacker, defender) {
    if (this.pp.current <= 0) return "no pp";
    if (Math.random > this.accuracy / 100) return "avoided";
    this.pp.current -= 1;

    const { attack, defence } = this.getStats(attacker, defender);
    const baseDmg = this.calculateBaseDamage(attacker.level, attack, defence);
    const critical = this.getCriticalMultiplier();
    const random = this.getRandomMultiplier();
    const stab = this.type === this.getStabMultiplier();
    const typeMultiplier = this.calculateDamageMultiplier(defender);
    const finalDamage = baseDmg * critical * random * stab * typeMultiplier;

    console.log(`${attacker.name} used ${this.name}!`);

    defender.takeDamage(finalDamage);

    switch (typeMultiplier) {
      case 0:
        console.log(`It doesn't effect the foes ${defender.name}`);
        break;
      case 0.5:
        console.log(`It's not very effective!`);
        break;
      case 2:
        console.log(`It's super effective!`);
        break;
      default:
        break;
    }
  }

  getStats(attacker, defender) {
    if (this.category === "physical") {
      return { attack: attacker.stats.attack, defence: defender.stats.defence };
    } else if (this.category === "special") {
      return {
        attack: attacker.stats.specialAttack,
        defence: defender.stats.specialDefence,
      };
    }
    return { attack: 0, defence: 0 };
  }

  calculateBaseDamage(level, attack, defence) {
    return ((0.4 * level + 2) * this.power * (attack / defence)) / 50 + 2;
  }

  getCriticalMultiplier() {
    return Math.random() <= 0.0625 ? 2 : 1;
  }

  getRandomMultiplier() {
    return 0.85 + Math.random() * 0.15;
  }

  getStabMultiplier(attackerType) {
    return this.type === attackerType ? 1.5 : 1;
  }

  calculateDamageMultiplier(defender) {
    const typeChart = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1, 1, 0.5, 1, 1], // Normal
      [1, 0.5, 0.5, 1, 2, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2, 1, 1], // Fire
      [1, 2, 0.5, 1, 0.5, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1, 1], // Water
      [1, 1, 2, 0.5, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5, 1, 1, 1, 1], // Electric
      [1, 0.5, 2, 1, 0.5, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5, 1, 1], // Grass
      [1, 0.5, 0.5, 1, 2, 0.5, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 0.5, 1, 1], // Ice
      [2, 1, 1, 1, 1, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 2, 0, 1, 2, 2, 0.5, 1], // Fighting
      [1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 0, 2, 1], // Poison
      [1, 2, 1, 2, 0.5, 1, 1, 2, 1, 0, 1, 0.5, 2, 1, 1, 1, 2, 1, 1], // Ground
      [1, 1, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 0.5, 1, 1], // Flying
      [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 0, 0.5, 1, 1], // Psychic
      [1, 0.5, 1, 1, 2, 1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 0.5, 1, 2, 0.5, 0.5, 1], // Bug
      [1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 0.5, 1, 1], // Rock
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 1, 1], // Ghost
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0.5, 0, 1], // Dragon
      [1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 0.5, 1], // Dark
      [1, 0.5, 0.5, 0.5, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0.5, 2, 1], // Steel
      [1, 0.5, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 1, 2, 2, 0.5, 1, 1], // Fairy
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // None
    ];

    const defenderType1Index = this.getTypeIndex(defender.type1);
    const defenderType2Index = this.getTypeIndex(defender.type2);
    const moveTypeIndex = this.getTypeIndex(this.type);
    return (
      typeChart[defenderType1Index][moveTypeIndex] *
      typeChart[defenderType2Index][moveTypeIndex]
    );
  }

  getTypeIndex(type) {
    const types = [
      "normal",
      "fire",
      "water",
      "electric",
      "grass",
      "ice",
      "fighting",
      "poison",
      "ground",
      "flying",
      "psychic",
      "bug",
      "rock",
      "ghost",
      "dragon",
      "dark",
      "steel",
      "fairy",
      "none",
    ];

    return types.indexOf(type);
  }
}

module.exports = Move;
