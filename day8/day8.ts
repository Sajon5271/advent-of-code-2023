import { readFileSync } from 'node:fs';

export async function resultOutput(fileName: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const textFile = readFileSync(__dirname + '\\' + fileName, 'utf-8');
    const splitData = textFile.split('\n\n');
    type dirString = `/^[LR]+$/`;
    const direction: dirString = splitData[0] as dirString;
    const allNodes = splitData[1]
      .split('\n')
      .map((el) => {
        const [key, node] = el.split('=').map((str) => str.trim());
        const [L, R] = node
          .substring(1, node.length - 1)
          .split(',')
          .map((str) => str.trim());
        return {
          [key]: { L, R },
        };
      })
      .reduce((acc, curr) => {
        return { ...acc, ...curr };
      }, {});
    type keyOfNode = keyof typeof allNodes;
    let currPoint: keyOfNode = 'AAA';
    let steps = 0;
    const dirLength = direction.length;
    while (currPoint !== 'ZZZ') {
      const currDir: 'L' | 'R' = direction[steps % direction.length] as
        | 'L'
        | 'R';
      currPoint = allNodes[currPoint][currDir];
      steps++;
    }
    resolve(steps);
  });
}

(async function () {
  const res = await resultOutput('input-day8.txt');
  console.log(res);
})();
