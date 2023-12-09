import { readFileSync } from 'node:fs';

export async function resultOutput(fileName: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const textFile = readFileSync(__dirname + '\\' + fileName, 'utf-8');
    const datas = textFile.split('\n');
    const times = +datas[0]
      .split(':')[1]
      .split(' ')
      .filter((x) => x)
      .join('');
    const distances = +datas[1]
      .split(':')[1]
      .split(' ')
      .filter((x) => x)
      .join('');
    console.log(times, distances);
    let winsOn = 0;
    for (let i = 0; i <= Math.floor(times / 2); i++) {
      if ((times - i) * i > distances) {
        winsOn++;
      }
    }
    const total = times % 2 ? winsOn * 2 : winsOn * 2 - 1;
    resolve(total);
  });
}

(async function () {
  const res = await resultOutput('input-day6.txt');
  console.log(res);
})();
