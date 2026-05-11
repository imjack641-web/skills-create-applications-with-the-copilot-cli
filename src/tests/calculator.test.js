const {
  add,
  subtract,
  multiply,
  divide,
  calculate,
} = require("../calculator");

describe("calculator functions", () => {
  describe("add", () => {
    test("adds positive numbers", () => {
      expect(add(2, 3)).toBe(5);
    });

    test("adds negative and decimal numbers", () => {
      expect(add(-2.5, 1.5)).toBe(-1);
    });
  });

  describe("subtract", () => {
    test("subtracts positive numbers", () => {
      expect(subtract(10, 4)).toBe(6);
    });

    test("returns a negative result when needed", () => {
      expect(subtract(3, 8)).toBe(-5);
    });
  });

  describe("multiply", () => {
    test("multiplies positive numbers", () => {
      expect(multiply(45, 2)).toBe(90);
    });

    test("multiplies with zero", () => {
      expect(multiply(9, 0)).toBe(0);
    });
  });

  describe("divide", () => {
    test("divides positive numbers", () => {
      expect(divide(20, 5)).toBe(4);
    });

    test("supports decimal results", () => {
      expect(divide(7, 2)).toBe(3.5);
    });

    test("throws on division by zero", () => {
      expect(() => divide(8, 0)).toThrow("Division by zero is not allowed.");
    });
  });
});

describe("calculate", () => {
  test.each([
    ["2", "+", "3", 5],
    ["10", "-", "4", 6],
    ["45", "*", "2", 90],
    ["20", "/", "5", 4],
    ["2", "add", "3", 5],
    ["10", "subtract", "4", 6],
    ["6", "multiply", "7", 42],
    ["20", "divide", "5", 4],
    ["6", "x", "7", 42],
  ])("returns %p for %p %p %p", (left, operation, right, expected) => {
    expect(calculate(left, operation, right)).toBe(expected);
  });

  test("throws on unsupported operations", () => {
    expect(() => calculate("4", "^", "2")).toThrow('Unsupported operation: "^"');
  });

  test("throws on invalid left operand", () => {
    expect(() => calculate("left", "+", "2")).toThrow('Invalid left operand: "left"');
  });

  test("throws on invalid right operand", () => {
    expect(() => calculate("2", "+", "right")).toThrow('Invalid right operand: "right"');
  });

  test("throws on division by zero through calculate", () => {
    expect(() => calculate("8", "/", "0")).toThrow("Division by zero is not allowed.");
  });
});
