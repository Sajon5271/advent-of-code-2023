import { expect, describe } from '@jest/globals';
import { resultOutput as firstPuzzleResult } from './day9';
import { resultOutput as finalPuzzleResult } from './day9-2star';

describe('Test for advent of code day 9', () => {
  test('Expect given test input to output 114 in first puzzle', () => {
    expect(firstPuzzleResult('test.txt')).toBe(114);
    // expect(firstPuzzleResult('test2.txt')).resolves.toBe(6);
  });
  // test('Expect given test input to output 6 in last` puzzle', () => {
  //   expect.assertions(1);
  //   return expect(finalPuzzleResult('test-2star.txt')).resolves.toBe(6);
  // });
});
