#!/usr/bin/env node

/**
 * Supported operations:
 * - addition (+, add)
 * - subtraction (-, subtract)
 * - multiplication (*, x, multiply)
 * - division (/, divide)
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
};

function printUsage() {
  console.log("Usage: node src/calculator.js <number> <operation> <number>");
  console.log("Operations: +, -, *, /, add, subtract, multiply, divide");
}

function parseNumber(value, label) {
  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue)) {
    throw new Error(`Invalid ${label}: "${value}"`);
  }

  return parsedValue;
}

function calculate(leftInput, operationInput, rightInput) {
  const operation = operations[operationInput];

  if (!operation) {
    throw new Error(`Unsupported operation: "${operationInput}"`);
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
  calculate,
};
