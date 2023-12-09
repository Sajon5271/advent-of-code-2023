import { createReadStream } from 'node:fs';
import readline from 'node:readline';

const textFile = createReadStream(__dirname + '\\input-day1.txt', 'utf-8');

const numberInText = 'one,two,three,four,five,six,seven,eight,nine'.split(',');

const reader = readline.createInterface({
  input: textFile,
  crlfDelay: Infinity,
});

let total = 0;
reader.on('line', (line) => {
  const numberIndexes: { number: number; foundAt: number }[] = [];
  numberInText.forEach((num, idx) => {
    let lastFoundIn = line.indexOf(num);
    while (lastFoundIn !== -1) {
      numberIndexes.push({ number: idx + 1, foundAt: lastFoundIn });
      lastFoundIn = line.indexOf(num, lastFoundIn + 1);
    }
  });
  line.split('').forEach((x, idx) => {
    const numParsed = parseInt(x);
    if (!isNaN(numParsed)) {
      numberIndexes.push({ number: numParsed, foundAt: idx });
    }
  });
  const sortedNumbers = numberIndexes.sort((a, b) => {
    return a.foundAt - b.foundAt;
  });
  const strVal =
    '' +
    sortedNumbers[0].number +
    sortedNumbers[sortedNumbers.length - 1].number;
  const number = parseInt(strVal);
  total += number;
  // console.log(line, number, sortedNumbers);
});

reader.on('close', () => {
  console.log(total);
});
