const screen = document.querySelector('#screen');

//functions to perform an arithmetic operation
function add(op1, op2) {
    let result = op1+op2;
    result = Math.round(result*1000)/1000;
    return result.toString();
}

function subtract(op1, op2) {
    let result = op1-op2;
    result = Math.round(result*1000)/1000;
    return result.toString();
}

function multiply(op1, op2) {
    let result = op1*op2;
    result = Math.round(result*1000)/1000;
    return result.toString();
}

function divide(op1, op2) {
    let result = op1/op2;
    result = Math.round(result*1000)/1000;
    return result.toString();
}

//Performs operations on the given expression based on the operator
function operate(exp) {
    const expressionArray = splitExpression(exp);
    const operator = expressionArray[2];

    // Converting operands to numbers
    let operand1 = parseFloat(expressionArray[0]);
    let operand2 = parseFloat(expressionArray[1]);

    //check if any operand is null
    if(isNaN(operand1) || isNaN(operand2)) return expression;

    // Performing the operation
    switch (operator) {
        case '+':
            return add(operand1, operand2);
        case '-':
            return subtract(operand1, operand2);
        case 'x':
            return multiply(operand1, operand2);
        case '/':
            if(operand2 == 0) return 'bruh';
            return divide(operand1, operand2);
    }
}

// Splitting based on the arithmetic operators +, -, x, and / and Identifying the operator
function splitExpression(exp) {
    //Takes a string argument and returns an array of 2 operands and an operator
    let result = [];
    if(exp[0] === '+' || exp[0] === '-') {        //To handle expressions like -1+2 
        let plusOrMinus = exp[0];
        result = exp.slice(1).split(/[+\-x/]/);
        exp.slice(1).split('').map((ch) => {
            if(ch == '+' || ch == '-' || ch == '/' || ch == 'x') {
                result.push(ch);
            }
        })
        result[0] = plusOrMinus + result[0];
    }
    else {
        result = exp.split(/[+\-x/]/);
        exp.split('').map((ch) => {
            if(ch == '+' || ch == '-' || ch == '/' || ch == 'x') {
                result.push(ch);
            }
        })
    }

    return result;
}

let expression = '';

const keys = document.querySelectorAll('.symbols');
keys.forEach((key) => {
    key.addEventListener('click', () => {
        if(key.textContent.match(/[+\-x/]/)){
            expression = operate(expression);
            if(expression != 'bruh') {
                expression = expression.concat(key.textContent);
            }
            screen.textContent = expression;
        }
        else if(key.textContent == '=') {
            // checkExpression(expression);
            expression = operate(expression);
            screen.textContent = expression;
        }
        else{
            expression = expression.concat(key.textContent);
            screen.textContent = expression;
        }
    })
})

const deleteKey = document.querySelector('.delete');
deleteKey.addEventListener('click', () => {
    let expressionArr = expression.split('');
    expressionArr.pop();
    expression = expressionArr.join('');
    screen.textContent = expression;
})

const clearKey = document.querySelector('.clear');
clearKey.addEventListener('click', () => {
    expression = '';
    screen.textContent = expression;
})