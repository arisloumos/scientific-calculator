const display = document.getElementById("display");
const historyDisplay = document.getElementById("history");
const keys = document.getElementById("keys");

let currentInput = "";

keys.addEventListener("click", (e) => {
    if (!e.target.matches("button")) return;
    handleInput(e.target.dataset.value);
});

document.addEventListener("keydown", (e) => {
    const keyMap = { 'Enter': 'equals', 'Backspace': 'delete', 'Escape': 'clear', '*': '*', '/': '/', '+': '+', '-': '-', '(': '(', ')': ')' };
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') handleInput(e.key);
    else if (keyMap[e.key]) handleInput(keyMap[e.key]);
});

function handleInput(value) {
    if (value === "clear") {
        currentInput = "";
    } else if (value === "delete") {
        currentInput = currentInput.slice(0, -1);
    } else if (value === "equals") {
        calculate();
    } else {
        if (currentInput === "" && isOperator(value) && value !== "-" && value !== "(") return;
        currentInput += value;
    }
    updateDisplay();
}

function updateDisplay() {
    const display = document.getElementById("display");
    display.value = currentInput === "" ? "0" : currentInput;

    const length = display.value.length;
    if (length > 15) {
        display.style.fontSize = "1.5rem";
    } else if (length > 12) {
        display.style.fontSize = "2.2rem";
    } else if (length > 9) {
        display.style.fontSize = "2.8rem";
    } else {
        display.style.fontSize = "3.5rem";
    }

    display.scrollLeft = display.scrollWidth;
}

function isOperator(char) {
    return ["+", "-", "*", "/"].includes(char);
}

function calculate() {
    try {
        if (currentInput === "") return;
        const tokens = tokenize(currentInput);
        const postfix = shuntingYard(tokens);
        const result = evaluatePostfix(postfix);
        
        historyDisplay.innerText = currentInput + " =";

        let finalResult;
        if (Math.abs(result) > 1e12) {
            finalResult = result.toExponential(4);
        } else if (Number.isInteger(result)) {
            finalResult = result.toString();
        } else {
            finalResult = parseFloat(result.toFixed(8)).toString();
        }

        currentInput = finalResult;
        updateDisplay();
    } catch (error) {
        display.value = "Error";
        currentInput = "";
    }
}

function tokenize(str) {
    const tokens = str.match(/[0-9.]+|[a-z]+|[+\-*/()^]/gi);
    return tokens.map(t => t.toLowerCase());
}

function shuntingYard(tokens) {
    const output = [];
    const stack = [];
    const precedence = { "+": 1, "-": 1, "*": 2, "/": 2, "^": 3 };
    const functions = ["sin", "cos", "tan", "log", "sqrt"];

    tokens.forEach(token => {
        if (!isNaN(token)) {
            output.push(token);
        } else if (token === "pi") {
            output.push(Math.PI.toString());
        } else if (token === "e") {
            output.push(Math.E.toString());
        } else if (functions.includes(token)) {
            stack.push(token);
        } else if (token === "(") {
            stack.push(token);
        } else if (token === ")") {
            while (stack.length && stack[stack.length - 1] !== "(") {
                output.push(stack.pop());
            }
            stack.pop();
            if (stack.length && functions.includes(stack[stack.length - 1])) {
                output.push(stack.pop());
            }
        } else {
            while (stack.length && precedence[stack[stack.length - 1]] >= precedence[token]) {
                output.push(stack.pop());
            }
            stack.push(token);
        }
    });
    while (stack.length) output.push(stack.pop());
    return output;
}

function evaluatePostfix(postfix) {
    const stack = [];
    const functions = ["sin", "cos", "tan", "sqrt", "log"];

    postfix.forEach(token => {
        if (!isNaN(token)) {
            stack.push(parseFloat(token));
        } else if (functions.includes(token)) {
            const a = stack.pop();
            switch (token) {
                case "sin": stack.push(Math.sin(a * Math.PI / 180)); break;
                case "cos": stack.push(Math.cos(a * Math.PI / 180)); break;
                case "tan": stack.push(Math.tan(a * Math.PI / 180)); break;
                case "log": stack.push(Math.log10(a)); break;
                case "sqrt": stack.push(Math.sqrt(a)); break;
            }
        } else {
            const b = stack.pop();
            const a = stack.pop();
            switch (token) {
                case "+": stack.push(a + b); break;
                case "-": stack.push(a - b); break;
                case "*": stack.push(a * b); break;
                case "/": stack.push(a / b); break;
                case "^": stack.push(Math.pow(a, b)); break;
            }
        }
    });
    return stack[0];
}