import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Display } from './Display';

export const performCalculation = {
  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  '=': (firstOperand, secondOperand) => secondOperand
};

const inputDigit = (digit, displayValue, setDisplayValue, waitingForSecondOperand, setWaitingForSecondOperand) => {
  if (displayValue.length >= 9) {
    return; // Limita el número de caracteres a 9
  }
  if (waitingForSecondOperand) {
    setDisplayValue(String(digit));
    setWaitingForSecondOperand(false);
  } else {
    setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
  }
};

export const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const handleDigit = (digit) => inputDigit(digit, displayValue, setDisplayValue, waitingForSecondOperand, setWaitingForSecondOperand);

  const inputDot = () => {
    if (waitingForSecondOperand) {
      setDisplayValue('0.');
      setWaitingForSecondOperand(false);
    } else if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForSecondOperand) {
      setOperator(nextOperator);
      return;
    }

    if (firstOperand == null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const currentValue = firstOperand || 0;
      const result = performCalculation[operator](currentValue, inputValue);

      if (result < 0 || result > 999999999) {
        setDisplayValue('ERROR');
      } else {
        setDisplayValue(String(result).slice(0, 9));
      }
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const toggleSign = () => {
    if (displayValue === '0') {
      return;
    }
    const newValue = parseFloat(displayValue) * -1;
    if (newValue < 0) {
      setDisplayValue('ERROR');
    } else {
      setDisplayValue(String(newValue));
    }
  };

  const clearAll = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleKeyPress = (event) => {
    const { key } = event;
    if (key >= '0' && key <= '9') {
      handleDigit(parseInt(key, 10));
    } else if (key === '.') {
      inputDot();
    } else if (key === '+') {
      handleOperator('+');
    } else if (key === '-') {
      handleOperator('-');
    } else if (key === '*') {
      handleOperator('*');
    } else if (key === '/') {
      handleOperator('/');
    } else if (key === 'Enter') {
      handleOperator('=');
    } else if (key === 'Escape') {
      clearAll();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [displayValue, waitingForSecondOperand]);

  return (
    <div id="calculator">
      <Display value={displayValue} />
      <div id="buttons">
        <Button value="7" onClick={() => handleDigit(7)} />
        <Button value="8" onClick={() => handleDigit(8)} />
        <Button value="9" onClick={() => handleDigit(9)} />
        <Button value="/" onClick={() => handleOperator('/')} className="operation" />
        <Button value="4" onClick={() => handleDigit(4)} />
        <Button value="5" onClick={() => handleDigit(5)} />
        <Button value="6" onClick={() => handleDigit(6)} />
        <Button value="*" onClick={() => handleOperator('*')} className="operation" />
        <Button value="1" onClick={() => handleDigit(1)} />
        <Button value="2" onClick={() => handleDigit(2)} />
        <Button value="3" onClick={() => handleDigit(3)} />
        <Button value="-" onClick={() => handleOperator('-')} className="operation" />
        <Button value="0" onClick={() => handleDigit(0)} />
        <Button value="." onClick={inputDot} />
        <Button value="=" onClick={() => handleOperator('=')} className="equal" />
        <Button value="+" onClick={() => handleOperator('+')} className="operation" />
        <Button value="+/-" onClick={toggleSign} className="operation" />
      </div>
    </div>
  );
};

// Export inputDigit for testing
export { inputDigit };
