import { createReadStream } from 'node:fs';
import readline from 'node:readline';

export async function resultOutput(fileName: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const textFile = createReadStream(__dirname + '\\' + fileName, 'utf-8');

    const reader = readline.createInterface({
      input: textFile,
      crlfDelay: Infinity,
    });
    let total = 0;
    reader.on('line', (line) => {
      const parsedLine = line.split(':')[1].split('|');
      const winningNumbers = parsedLine[0]
        .split(' ')
        .filter((el) => !!el)
        .map((num) => parseInt(num));
      const ownNumbers = parsedLine[1]
        .split(' ')
        .filter((el) => !!el)
        .map((num) => parseInt(num));
      let sum = 0.5;
      winningNumbers.forEach((el) => {
        if (ownNumbers.indexOf(el) !== -1) sum *= 2;
      });
      if (sum >= 1) total += sum;
    });
    reader.on('error', (err) => {
      reject(err);
    });
    reader.on('close', () => {
      resolve(total);
    });
  });
}

(async function () {
  const res = await resultOutput('input-day4.txt');
  console.log(res);
})();
