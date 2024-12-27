const Move = require("../../main/moves/move");
const PhysicalMove = require("../../main/moves/physicalMove");

describe("physical move class", () => {
  let earthquake;

  beforeEach(() => {
    earthquake = new PhysicalMove("Earthquake", "ground", 100, 100, 10);
  });
  describe("init", () => {
    it("should be an instance of move", () => {
      expect(earthquake instanceof Move).toBe(true);
    });

    it("should initialise with the correct values", () => {
      expect(earthquake.name).toBe("Earthquake");
      expect(earthquake.type).toBe("ground");
      expect(earthquake.category).toBe("physical");
      expect(earthquake.power).toBe(100);
      expect(earthquake.accuracy).toBe(100);
      expect(earthquake.pp.max).toBe(10);
      expect(earthquake.pp.current).toBe(10);
    });
  });

  describe("useMove", () => {
    it("should decrease the pp when invoked", () => {
      expect(earthquake.pp.current).toBe(10);
      earthquake.useMove();
      expect(earthquake.pp.current).toBe(9);
    });

    it("should not lower the pp below 0", () => {
      expect(earthquake.pp.current).toBe(10);
      earthquake.useMove();
      expect(earthquake.pp.current).toBe(9);
      earthquake.useMove();
      expect(earthquake.pp.current).toBe(8);
      earthquake.useMove();
      expect(earthquake.pp.current).toBe(7);
      earthquake.useMove();
      expect(earthquake.pp.current).toBe(6);
      earthquake.useMove();
      expect(earthquake.pp.current).toBe(5);
      earthquake.useMove();
      expect(earthquake.pp.current).toBe(4);
      earthquake.useMove();
      expect(earthquake.pp.current).toBe(3);
      earthquake.useMove();
      expect(earthquake.pp.current).toBe(2);
      earthquake.useMove();
      expect(earthquake.pp.current).toBe(1);
      earthquake.useMove();
      expect(earthquake.pp.current).toBe(0);
      earthquake.useMove();
      expect(earthquake.pp.current).toBe(0);
      expect(earthquake.useMove()).toBe(false);
    });
  });
});
