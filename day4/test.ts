import { expect, describe } from '@jest/globals';
import { resultOutput as firstPuzzleResult } from './day4';
import { resultOutput as finalPuzzleResult } from './day4-2star';

describe('Test for advent of code day 4', () => {
  test('Expect given test input to output 13 in first puzzle', () => {
    expect.assertions(1);
    return expect(firstPuzzleResult('test.txt')).resolves.toBe(13);
  });
  // test('Expect given test input to output 8 in last` puzzle', () => {
  //   expect.assertions(1);
  //   return expect(finalPuzzleResult('test.txt')).resolves.toBe(467835);
  // });
});
