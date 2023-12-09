import { createReadStream } from 'node:fs';
import readline from 'node:readline';

const possibleCubeColors = ['red', 'green', 'blue'];
const limit = { red: 12, green: 13, blue: 14 };

export async function resultOutput(fileName: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const textFile = createReadStream(__dirname + '\\' + fileName, 'utf-8');

    const reader = readline.createInterface({
      input: textFile,
      crlfDelay: Infinity,
    });

    let total = 0;

    reader.on('line', (line) => {
      const gameNumber = parseInt(line.split(':')[0].split(' ')[1]);
      const rounds = line
        .split(':')[1]
        .split(';')
        .map((el) => {
          return el
            .split(',')
            .map((x) => {
              const cubeInfo = x.split(' ').filter((val) => !!val);
              return { [cubeInfo[1]]: parseInt(cubeInfo[0]) };
            })
            .reduce((acc, curr) => {
              return { ...acc, ...curr };
            }, {});
        });
      const impossible = rounds.some((round) => {
        return (
          round.green > limit.green ||
          round.red > limit.red ||
          round.blue > limit.blue
        );
      });
      if (!impossible) {
        total += gameNumber;
      }
    });
    reader.on('close', () => {
      resolve(total);
    });
    reader.on('error', (err) => {
      reject(err);
    });
  });
}

(async function () {
  const res = await resultOutput('input-day2.txt');
  console.log(res)
})();
