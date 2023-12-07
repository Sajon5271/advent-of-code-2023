import { expect, describe } from '@jest/globals';
import { resultOutput as firstPuzzleResult } from './day7';
import { resultOutput as finalPuzzleResult } from './day7-2star';

describe('Test for advent of code day 7', () => {
  test('Expect given test input to output 6440 in first puzzle', () => {
    expect.assertions(1);
    return expect(firstPuzzleResult('test.txt')).resolves.toBe(6440);
  });
  test('Expect given test input to output 5905 in last` puzzle', () => {
    expect.assertions(1);
    return expect(finalPuzzleResult('test.txt')).resolves.toBe(5905);
  });
});
