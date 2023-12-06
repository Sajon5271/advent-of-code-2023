import { expect, describe } from '@jest/globals';
import { resultOutput as firstPuzzleResult } from './day6';
import { resultOutput as finalPuzzleResult } from './day6-2star';

describe('Test for advent of code day 6', () => {
  test('Expect given test input to output 288 in first puzzle', () => {
    expect.assertions(1);
    return expect(firstPuzzleResult('test.txt')).resolves.toBe(288);
  });
  // test('Expect given test input to output 46 in last` puzzle', () => {
  //   expect.assertions(1);
  //   return expect(finalPuzzleResult('test.txt')).resolves.toBe(46);
  // });
});
