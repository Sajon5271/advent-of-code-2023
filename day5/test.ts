import { expect, describe } from '@jest/globals';
import { resultOutput as firstPuzzleResult } from './day5';
import { resultOutput as finalPuzzleResult } from './day5-2star';

describe('Test for advent of code day 5', () => {
  test('Expect given test input to output 35 in first puzzle', () => {
    expect.assertions(1);
    return expect(firstPuzzleResult('test.txt')).resolves.toBe(35);
  });
  test('Expect given test input to output 46 in last` puzzle', () => {
    expect.assertions(1);
    return expect(finalPuzzleResult('test.txt')).resolves.toBe(46);
  });
});
