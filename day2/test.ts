import { expect, describe } from '@jest/globals';
import { resultOutput as firstPuzzleResult } from './day2';
import { resultOutput as finalPuzzleResult } from './day2-2star';

describe('Test for advent of code day 2', () => {
  test('Expect given test input to output 8 in first puzzle', () => {
    expect.assertions(1);
    return expect(firstPuzzleResult('test.txt')).resolves.toBe(8);
  });
  test('Expect given test input to output 8 in last` puzzle', () => {
    expect.assertions(1);
    return expect(finalPuzzleResult('test.txt')).resolves.toBe(2286);
  });
});
