import { expect, describe } from '@jest/globals';
import { resultOutput as firstPuzzleResult } from './day9';
import { resultOutput as finalPuzzleResult } from './day9-2star';

describe('Test for advent of code day 9', () => {
  test('Expect given test input to output 114 in first puzzle', () => {
    return expect(firstPuzzleResult('test.txt')).toBe(114);
  });
  test('Expect given test input to output 2 in last puzzle', () => {
    return expect(finalPuzzleResult('test.txt')).toBe(2);
  });
});
