import { expect, describe } from '@jest/globals';
import { resultOutput } from './day2';

describe('Test for advent of code day 2', () => {
  test('Expect given test input to output 8', () => {
    expect.assertions(1);
    return expect(resultOutput('test.txt')).resolves.toBe(8);
  });
});
