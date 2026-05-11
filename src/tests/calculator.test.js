const {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
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

  describe("modulo", () => {
    test("returns the remainder for positive numbers", () => {
      expect(modulo(5, 2)).toBe(1);
    });

    test("supports decimal operands", () => {
      expect(modulo(5.5, 2)).toBe(1.5);
    });

    test("throws on modulo by zero", () => {
      expect(() => modulo(8, 0)).toThrow("Modulo by zero is not allowed.");
    });
  });

  describe("power", () => {
    test("raises a number to a positive exponent", () => {
      expect(power(2, 3)).toBe(8);
    });

    test("supports zero and negative exponents", () => {
      expect(power(4, 0)).toBe(1);
      expect(power(2, -2)).toBe(0.25);
    });
  });

  describe("squareRoot", () => {
    test("returns the square root of a positive number", () => {
      expect(squareRoot(16)).toBe(4);
    });

    test("returns zero for zero", () => {
      expect(squareRoot(0)).toBe(0);
    });

    test("throws for negative numbers", () => {
      expect(() => squareRoot(-1)).toThrow(
        "Square root of a negative number is not allowed."
      );
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
    ["5", "%", "2", 1],
    ["5", "modulo", "2", 1],
    ["2", "^", "3", 8],
    ["2", "power", "3", 8],
  ])("returns %p for %p %p %p", (left, operation, right, expected) => {
    expect(calculate(left, operation, right)).toBe(expected);
  });

  test("supports square root shorthand input", () => {
    expect(calculate("√16")).toBe(4);
  });

  test("supports square root named operation", () => {
    expect(calculate("16", "sqrt")).toBe(4);
  });

  test("throws on unsupported operations", () => {
    expect(() => calculate("4", "unknown", "2")).toThrow(
      'Unsupported operation: "unknown"'
    );
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

  test("throws on modulo by zero through calculate", () => {
    expect(() => calculate("8", "%", "0")).toThrow("Modulo by zero is not allowed.");
  });

  test("throws on square root of negative numbers", () => {
    expect(() => calculate("√-16")).toThrow(
      "Square root of a negative number is not allowed."
    );
  });

  test("throws on invalid square root operand", () => {
    expect(() => calculate("√banana")).toThrow(
      'Invalid square root operand: "banana"'
    );
  });
});
