const Move = require("../../main/moves/move.js");
const SpecialMove = require("../../main/moves/specialMove.js");

describe("special move class", () => {
  let zapCannon;

  beforeEach(() => {
    zapCannon = new SpecialMove("Zap Cannon", "electric", 120, 50, 5);
  });

  describe("init", () => {
    it("should be an instance of move", () => {
      expect(zapCannon instanceof Move).toBe(true);
    });

    it("should initialise with the correct values", () => {
      expect(zapCannon.name).toBe("Zap Cannon");
      expect(zapCannon.type).toBe("electric");
      expect(zapCannon.category).toBe("special");
      expect(zapCannon.power).toBe(120);
      expect(zapCannon.accuracy).toBe(50);
      expect(zapCannon.pp.max).toBe(5);
      expect(zapCannon.pp.current).toBe(5);
    });
  });

  describe("useMove", () => {
    it("should decrease the pp when invoked", () => {
      expect(zapCannon.pp.current).toBe(5);
      zapCannon.useMove();
      expect(zapCannon.pp.current).toBe(4);
    });

    it("should not lower the pp below 0", () => {
      expect(zapCannon.pp.current).toBe(5);
      zapCannon.useMove();
      expect(zapCannon.pp.current).toBe(4);
      zapCannon.useMove();
      expect(zapCannon.pp.current).toBe(3);
      zapCannon.useMove();
      expect(zapCannon.pp.current).toBe(2);
      zapCannon.useMove();
      expect(zapCannon.pp.current).toBe(1);
      zapCannon.useMove();
      expect(zapCannon.pp.current).toBe(0);
      zapCannon.useMove();
      expect(zapCannon.pp.current).toBe(0);
      expect(zapCannon.useMove()).toBe(false);
    });
  });
});
