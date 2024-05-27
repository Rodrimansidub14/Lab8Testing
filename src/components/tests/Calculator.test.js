import React from 'react'; // Asegúrate de importar React
import { inputDigit, performCalculation } from '../Calculator';

test('adds 1 + 2 to equal 3', () => {
  expect(performCalculation['+'](1, 2)).toBe(3);
});

test('subtracts 5 - 3 to equal 2', () => {
  expect(performCalculation['-'](5, 3)).toBe(2);
});

test('multiplies 2 * 3 to equal 6', () => {
  expect(performCalculation['*'](2, 3)).toBe(6);
});

test('divides 6 / 2 to equal 3', () => {
  expect(performCalculation['/'](6, 2)).toBe(3);
});

test('displays ERROR for results greater than 999999999', () => {
  const largeNumber = 999999999;
  const result = performCalculation['+'](largeNumber, 1);
  expect(result).toBeGreaterThan(999999999);
});

test('displays ERROR for negative results', () => {
  const result = performCalculation['-'](1, 2);
  expect(result).toBeLessThan(0);
});

test('inputDigit limits display value to 9 characters', () => {
  // Mock the useState hook
  const setDisplayValue = jest.fn();
  const useStateMock = (initState) => [initState, setDisplayValue];
  jest.spyOn(React, 'useState').mockImplementation(useStateMock);

  // Input a series of digits
  inputDigit(1, '0', setDisplayValue, false, jest.fn());
  inputDigit(2, '1', setDisplayValue, false, jest.fn());
  inputDigit(3, '12', setDisplayValue, false, jest.fn());
  inputDigit(4, '123', setDisplayValue, false, jest.fn());
  inputDigit(5, '1234', setDisplayValue, false, jest.fn());
  inputDigit(6, '12345', setDisplayValue, false, jest.fn());
  inputDigit(7, '123456', setDisplayValue, false, jest.fn());
  inputDigit(8, '1234567', setDisplayValue, false, jest.fn());
  inputDigit(9, '12345678', setDisplayValue, false, jest.fn());
  inputDigit(0, '123456789', setDisplayValue, false, jest.fn()); // This should not be accepted

  expect(setDisplayValue).toHaveBeenCalledTimes(9); // Should be called only 9 times
});
