import { readFileSync } from 'node:fs';

const dirs = [
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: -1 },
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
];
export async function resultOutput(fileName: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const textFile = readFileSync(__dirname + '\\' + fileName, 'utf-8');

    const dataArr = textFile.split('\n').map((el) => el.split(''));

    const specialCharPos: { x: number; y: number }[] = [];
    for (let i = 0; i < dataArr.length; i++) {
      for (let j = 0; j < dataArr[i].length; j++) {
        if (
          !(
            (dataArr[i][j] >= '0' && dataArr[i][j] <= '9') ||
            dataArr[i][j] === '.'
          )
        ) {
          specialCharPos.push({ x: i, y: j });
        }
      }
    }
    let total = 0;
    specialCharPos.forEach((el) => {
      dirs.forEach((dir) => {
        const currX = el.x + dir.x;
        const currY = el.y + dir.y;
        if (
          currX < 0 ||
          currX > dataArr.length ||
          currY < 0 ||
          currY > dataArr[0].length
        ) {
          return;
        }
        if (dataArr[currX][currY] === '.') return;
        let currPoint = dataArr[currX][currY];
        let predX = currX;
        let predY = currY;
        while (currPoint >= '0' && currPoint <= '9' && predY >= 0) {
          predY--;
          currPoint = dataArr[currX][predY];
        }
        predY++;
        const gatherNumbers = [];
        currPoint = dataArr[currX][predY];
        while (
          currPoint >= '0' &&
          currPoint <= '9' &&
          predY <= dataArr[0].length
        ) {
          gatherNumbers.push(currPoint);
          dataArr[currX][predY] = '.';
          predY++;
          currPoint = dataArr[currX][predY];
        }
        // console.log(gatherNumbers)
        if (!gatherNumbers.length) return;
        const number = parseInt(gatherNumbers.join(''));
        console.log(number);
        total += number;
      });
    });
    resolve(total);
  });
}

(async function () {
  const res = await resultOutput('input-day3.txt');
  console.log(res);
})();
