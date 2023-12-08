import { readFileSync } from 'node:fs';

export function resultOutput(fileName: string): number {
  const textFile = readFileSync(__dirname + '\\' + fileName, 'utf-8');
  const splitData = textFile.split('\n\n');
  type dirString = `/^[LR]+$/`;
  const direction: dirString = splitData[0] as dirString;
  const allNodes: { [key: string]: { L: string; R: string } } = splitData[1]
    .split('\n')
    .map((el) => {
      const [key, node] = el.split('=').map((str) =>
        str
          .split('')
          .filter((x) => x)
          .join()
      );
      const [L, R] = node
        .substring(1, node.length - 1)
        .split(',')
        .map((str) =>
          str
            .split('')
            .filter((x) => x)
            .join()
        );
      console.log(L, R, node);
      return {
        [key]: { L, R },
      };
    })
    .reduce((acc, curr) => {
      return { ...acc, ...curr };
    }, {});
  console.log(allNodes);
  let startingNodes = Object.keys(allNodes).filter(
    (el) => el.split('').at(-1) === 'A'
  );
  let steps = 0;
  console.log(startingNodes, startingNodes.length);
  const dirLength = direction.length;
  // while (!checkIfAllEndingNodesEndInZ(startingNodes)) {
  //   const currDir: 'L' | 'R' = direction[steps % direction.length] as 'L' | 'R';
  //   startingNodes = startingNodes.map((el) => {
  //     return allNodes[el][currDir];
  //   });
  //   steps++;
  // }
  console.log(startingNodes);
  return steps;
}

// (async function () {
//   const res = await resultOutput('input-day8.txt');
//   console.log(res);
// })();
console.log(resultOutput('test-2star.txt'));
function checkIfAllEndingNodesEndInZ(point: string[]): boolean {
  return point.every((el) => el.split('').at(-1) === 'Z');
}
