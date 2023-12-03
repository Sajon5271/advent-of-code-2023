import { expect, describe } from '@jest/globals';
import { resultOutput as firstPuzzleResult } from './day3';
import { resultOutput as finalPuzzleResult } from './day3-2star';

describe('Test for advent of code day 3', () => {
  test('Expect given test input to output 4361 in first puzzle', () => {
    expect.assertions(1);
    return expect(firstPuzzleResult('test.txt')).resolves.toBe(4361);
  });
  test('Expect given test input to output 8 in last` puzzle', () => {
    expect.assertions(1);
    return expect(finalPuzzleResult('test.txt')).resolves.toBe(467835);
  });
});
