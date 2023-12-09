import { readFileSync } from 'node:fs';
import { lcm, transpose } from 'mathjs';
import { min } from 'lodash';

export function resultOutput(fileName: string): number {
  const textFile = readFileSync(__dirname + '\\' + fileName, 'utf-8');
  const allSeries = textFile.split('\n');
  const values: number[] = [];
  allSeries.forEach((series) => {
    const seriesNums = series.split(' ').map((x) => +x);
    const seriesConvergence: number[][] = [];
    let loop = 0;
    seriesConvergence.push(seriesNums);
    while (!seriesConvergence[loop].every((el) => el === 0)) {
      const currDiff: number[] = [];
      for (let i = 0; i < seriesConvergence[loop].length - 1; i++) {
        currDiff.push(
          seriesConvergence[loop][i + 1] - seriesConvergence[loop][i]
        );
      }
      seriesConvergence.push(currDiff);
      loop++;
    }
    values.push(
      seriesConvergence.reduce((acc, curr) => acc + (curr.at(-1) || 0), 0)
    );
  });
  let total = values.reduce((acc, curr) => acc + curr, 0);
  return total;
}

console.log(resultOutput('input-day9.txt'));
