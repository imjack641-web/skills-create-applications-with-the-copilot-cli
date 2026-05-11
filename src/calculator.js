#!/usr/bin/env node

/**
 * Supported operations:
 * - addition (+, add)
 * - subtraction (-, subtract)
 * - multiplication (*, x, multiply)
 * - division (/, divide)
 * - modulo (%, modulo)
 * - power (^, power)
 * - square root (sqrt, √number)
 */

function add(left, right) {
  return left + right;
}

function subtract(left, right) {
  return left - right;
}

function multiply(left, right) {
  return left * right;
}

function divide(left, right) {
  if (right === 0) {
    throw new Error("Division by zero is not allowed.");
  }

  return left / right;
}

function modulo(left, right) {
  if (right === 0) {
    throw new Error("Modulo by zero is not allowed.");
  }

  return left % right;
}

function power(left, right) {
  return left ** right;
}

function squareRoot(value) {
  if (value < 0) {
    throw new Error("Square root of a negative number is not allowed.");
  }

  return Math.sqrt(value);
}

const operations = {
  "+": add,
  add,
  "-": subtract,
  subtract,
  "*": multiply,
  x: multiply,
  multiply,
  "/": divide,
  divide,
  "%": modulo,
  modulo,
  "^": power,
  power,
  sqrt: squareRoot,
};

function printUsage() {
  console.log("Usage: node src/calculator.js <number> <operation> <number>");
  console.log("Usage: node src/calculator.js √<number>");
  console.log(
    "Operations: +, -, *, /, %, ^, add, subtract, multiply, divide, modulo, power, sqrt"
  );
}

function parseNumber(value, label) {
  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue)) {
    throw new Error(`Invalid ${label}: "${value}"`);
  }

  return parsedValue;
}

function parseSquareRootOperand(value) {
  if (typeof value !== "string" || !value.startsWith("√")) {
    throw new Error(`Unsupported operation: "${value}"`);
  }

  return parseNumber(value.slice(1), "square root operand");
}

function calculate(leftInput, operationInput, rightInput) {
  if (arguments.length === 1) {
    return squareRoot(parseSquareRootOperand(leftInput));
  }

  const operation = operations[operationInput];

  if (!operation) {
    throw new Error(`Unsupported operation: "${operationInput}"`);
  }

  if (operation === squareRoot) {
    return squareRoot(parseNumber(leftInput, "square root operand"));
  }

  const left = parseNumber(leftInput, "left operand");
  const right = parseNumber(rightInput, "right operand");

  return operation(left, right);
}

function main(argv) {
  if (argv.includes("--help") || argv.includes("-h")) {
    printUsage();
    return;
  }

  if (argv.length === 1 && argv[0].startsWith("√")) {
    try {
      console.log(calculate(argv[0]));
    } catch (error) {
      console.error(error.message);
      process.exitCode = 1;
    }
    return;
  }

  if (argv.length !== 3) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  try {
    const [leftInput, operationInput, rightInput] = argv;
    const result = calculate(leftInput, operationInput, rightInput);

    console.log(result);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main(process.argv.slice(2));
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  calculate,
};
