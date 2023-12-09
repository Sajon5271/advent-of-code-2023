import { readFileSync } from 'node:fs';
import { lcm, transpose } from 'mathjs';
import { min } from 'lodash';

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
          .trim()
          .split('')
          .filter((x) => x)
          .join('')
      );
      const [L, R] = node
        .substring(1, node.length - 1)
        .split(',')
        .map((str) =>
          str
            .trim()
            .split('')
            .filter((x) => x)
            .join('')
        );
      return {
        [key]: { L, R },
      };
    })
    .reduce((acc, curr) => {
      return { ...acc, ...curr };
    }, {});
  let startingNodes = Object.keys(allNodes).filter(
    (el) => el.split('').at(-1) === 'A'
  );
  const nodeList: { node: string; pos: number }[][] = [];
  const dirLength = direction.length;
  startingNodes.forEach((node, idx) => {
    nodeList.push([]);
    let steps = 0;
    let currNode = node;
    while (!nodeList[idx].find((el) => el.node === currNode)) {
      const currDir: 'L' | 'R' = direction[steps % dirLength] as 'L' | 'R';
      if (currNode.split('').at(-1) === 'Z') {
        nodeList[idx].push({ node: currNode, pos: steps });
      }
      currNode = allNodes[currNode][currDir];
      steps++;
    }
  });
  const stepsToCompare: number[][] = [];
  nodeList.forEach((el) => {
    stepsToCompare.push(el.map((x) => x.pos));
  });
  // Adding ts-ignore in next line, As far as I know spreading a number[] should work
  // in TS, but most probably because of the library function type declaration it is 
  // not working. I am too tired to write a lcm function now, so we are stuck with this 😒
  // @ts-ignore
  const lcms = transpose(stepsToCompare).map((el) => lcm(...el));

  return min(lcms) || 0;
}

console.log(resultOutput('input-day8.txt'));
