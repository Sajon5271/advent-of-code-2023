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
      const minNeeded = rounds.reduce((acc, curr) => {
        curr.red = curr.red || 0;
        curr.green = curr.green || 0;
        curr.blue = curr.blue || 0;

        return {
          red: acc.red && acc.red > curr.red ? acc.red : curr.red,
          green: acc.green && acc.green > curr.green ? acc.green : curr.green,
          blue: acc.blue && acc.blue > curr.blue ? acc.blue : curr.blue,
        };
      }, {});
      total +=
        (minNeeded.red || 1) * (minNeeded.green || 1) * (minNeeded.blue || 1);
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
  console.log(res);
})();
