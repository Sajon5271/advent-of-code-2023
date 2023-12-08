import { expect, describe } from '@jest/globals';
import { resultOutput as firstPuzzleResult } from './day8';
import { resultOutput as finalPuzzleResult } from './day8-2star';

describe('Test for advent of code day 7', () => {
  test('Expect given test input to output 2 and 6 in first puzzle', () => {
    expect.assertions(2);
    expect(firstPuzzleResult('test.txt')).resolves.toBe(2);
    expect(firstPuzzleResult('test2.txt')).resolves.toBe(6);
  });
  test('Expect given test input to output 6 in last` puzzle', () => {
    expect.assertions(1);
    return expect(finalPuzzleResult('test-2star.txt')).resolves.toBe(6);
  });
});
