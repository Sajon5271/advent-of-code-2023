import { readFileSync } from 'node:fs';

export async function resultOutput(fileName: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const textFile = readFileSync(__dirname + '\\' + fileName, 'utf-8');
    const datas = textFile.split('\n');
    const times = datas[0]
      .split(':')[1]
      .split(' ')
      .filter((x) => x)
      .map((x) => +x);
    const distances = datas[1]
      .split(':')[1]
      .split(' ')
      .filter((x) => x)
      .map((x) => +x);
    console.log(times, distances);
    const winsOn: number[] = [];
    times.forEach((t, idx) => {
      winsOn.push(0);
      for (let i = 0; i <= Math.floor(t / 2); i++) {
        if ((t - i) * i > distances[idx]) {
          winsOn[idx]++;
        }
      }
    });
    const total = winsOn
      .map((x, idx) => (times[idx] % 2 ? x * 2 : x * 2 - 1))
      .reduce((acc, curr) => acc * curr, 1);
    resolve(total);
  });
}

(async function () {
  const res = await resultOutput('input-day6.txt');
  console.log(res);
})();
