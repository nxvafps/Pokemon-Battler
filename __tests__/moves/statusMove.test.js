const Move = require("../../main/moves/move.js");
const StatusMove = require("../../main/moves/statusMove.js");

describe("status move class", () => {
  let sketch;

  beforeEach(() => {
    sketch = new StatusMove("Sketch", "normal", 0, 100, 1);
  });

  describe("init", () => {
    it("should be an instance of move", () => {
      expect(sketch instanceof Move).toBe(true);
    });

    it("should initialise with the correct values", () => {
      expect(sketch.name).toBe("Sketch");
      expect(sketch.type).toBe("normal");
      expect(sketch.category).toBe("status");
      expect(sketch.power).toBe(0);
      expect(sketch.accuracy).toBe(100);
      expect(sketch.pp.max).toBe(1);
      expect(sketch.pp.current).toBe(1);
    });
  });

  describe("useMove", () => {
    it("should return true when invoked when current pp > 0", () => {
      expect(sketch.pp.current > 0).toBe(true);
      expect(sketch.useMove()).toBe(true);
    });

    it("should decrease the pp when invoked", () => {
      expect(sketch.pp.current).toBe(1);
      expect(sketch.useMove()).toBe(true);
      expect(sketch.pp.current).toBe(0);
    });

    it("should return false if invoked when current pp = 0", () => {
      expect(sketch.pp.current).toBe(1);
      expect(sketch.useMove()).toBe(true);
      expect(sketch.pp.current).toBe(0);
      expect(sketch.useMove()).toBe(false);
      expect(sketch.pp.current).toBe(0);
    });
  });
});
