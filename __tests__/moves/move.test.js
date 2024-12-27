const Move = require("../../main/moves/move");

describe("move class", () => {
  let earthquake, lavePlume, spore;

  beforeEach(() => {
    earthquake = new Move("Earthquake", "ground", "physical", 100, 100, 10);
    lavePlume = new Move("Lava Plume", "fire", "special", 80, 100, 15);
    spore = new Move("Spore", "grass", "status", 0, 100, 15);
  });

  describe("init", () => {
    it("initialises with the correct name", () => {
      expect(earthquake.name).toBe("Earthquake");
      expect(lavePlume.name).toBe("Lava Plume");
      expect(spore.name).toBe("Spore");
    });

    it("initialises with the correct type", () => {
      expect(earthquake.type).toBe("ground");
      expect(lavePlume.type).toBe("fire");
      expect(spore.type).toBe("grass");
    });

    it("initialises with the correct category", () => {
      expect(earthquake.category).toBe("physical");
      expect(lavePlume.category).toBe("special");
      expect(spore.category).toBe("status");
    });

    it("initialises with the correct power", () => {
      expect(earthquake.power).toBe(100);
      expect(lavePlume.power).toBe(80);
      expect(spore.power).toBe(0);
    });

    it("initialises with the correct accuracy", () => {
      expect(earthquake.accuracy).toBe(100);
      expect(lavePlume.accuracy).toBe(100);
      expect(spore.accuracy).toBe(100);
    });

    it("initialises with the correct max pp", () => {
      expect(earthquake.pp.max).toBe(10);
      expect(lavePlume.pp.max).toBe(15);
      expect(spore.pp.max).toBe(15);
    });

    it("initialises with the correct current pp", () => {
      expect(earthquake.pp.current).toBe(10);
      expect(lavePlume.pp.current).toBe(15);
      expect(spore.pp.current).toBe(15);
    });

    it("status moves cannot initialise with a power", () => {
      let willOWisp = new Move("Will-O-Wisp", "fire", "status", 50, 85, 15);
      expect(willOWisp.power).toBe(0);
    });
  });

  describe("useMove", () => {
    it("decreases the current pp when the method is called", () => {
      expect(earthquake.pp.current).toBe(10);
      expect(lavePlume.pp.current).toBe(15);
      expect(spore.pp.current).toBe(15);

      expect(earthquake.useMove()).toBe(true);
      expect(lavePlume.useMove()).toBe(true);
      expect(spore.useMove()).toBe(true);

      expect(earthquake.pp.current).toBe(9);
      expect(lavePlume.pp.current).toBe(14);
      expect(spore.pp.current).toBe(14);
    });

    it("will not lower the pp below 0", () => {
      const sketch = new Move("Sketch", "normal", "status", 0, 100, 1);
      expect(sketch.pp.current).toBe(1);
      sketch.useMove();
      expect(sketch.pp.current).toBe(0);
      expect(sketch.useMove()).toBe(false);
      expect(sketch.pp.current).toBe(0);
    });
  });
});
