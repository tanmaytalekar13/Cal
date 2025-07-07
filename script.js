const display = document.getElementById('display');
let currentInput = '';
let operator = '';
let firstNumber = '';

document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (!isNaN(value) || value === '.') {
      // Prevent multiple decimals
      if (value === '.' && currentInput.includes('.')) return;
      currentInput += value;
      display.textContent = currentInput;
    } else if (value === 'C') {
      // Clear all
      currentInput = '';
      operator = '';
      firstNumber = '';
      display.textContent = '0';
    } else if (value === '=') {
      if (firstNumber && operator && currentInput) {
        const result = calculate(firstNumber, currentInput, operator);
        display.textContent = result;
        currentInput = result.toString();
        operator = '';
        firstNumber = '';
      }
    } else {
      // Operator pressed
      if (currentInput) {
        firstNumber = currentInput;
        operator = value;
        currentInput = '';
      }
    }
  });
});

function calculate(num1, num2, op) {
  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);
  if (isNaN(n1) || isNaN(n2)) return 'Error';
  switch(op) {
    case '+': return n1 + n2;
    case '-': return n1 - n2;
    case '*': return n1 * n2;
    case '/': return n2 !== 0 ? n1 / n2 : 'Error';
    default: return 'Error';
  }
}
