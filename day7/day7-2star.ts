import { countBy, isEqual, omit } from 'lodash';
import { readFileSync } from 'node:fs';

const allPlayPossible = [
  { '5': 1 },
  { '4': 1, '1': 1 },
  { '3': 1, '2': 1 },
  { '3': 1, '1': 2 },
  { '2': 2, '1': 1 },
  { '2': 1, '1': 3 },
  { '1': 5 },
].reverse();

const suits = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];

export async function resultOutput(fileName: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const textFile = readFileSync(__dirname + '\\' + fileName, 'utf-8');
    const datas = textFile.split('\n').map((el) => {
      const currentHand = el.split(' ');
      return {
        hand: currentHand[0],
        bid: +currentHand[1],
      };
    });
    const sortedHands = datas.toSorted((a, b) => {
      const diff = getHandPower(a.hand) - getHandPower(b.hand);
      if (!diff) {
        const aVal = a.hand.split('');
        const bVal = b.hand.split('');
        for (let i = 0; i < aVal.length; i++) {
          if (suits.indexOf(aVal[i]) > suits.indexOf(bVal[i])) {
            return -1;
          } else if (suits.indexOf(aVal[i]) < suits.indexOf(bVal[i])) {
            return 1;
          }
        }
        return 0;
      }
      return diff;
    });
    const total = sortedHands.reduce(
      (acc, curr, idx) => acc + curr.bid * (idx + 1),
      0
    );
    resolve(total);
  });
}

(async function () {
  const res = await resultOutput('input-day7.txt');
  console.log(res);
})();

function getHandPower(hand: string): number {
  const cards = hand.split('');
  // Object.groupBy() is not yet supported in nodejs
  const countedCards = countBy(cards, (el) => el);
  const countArr = Object.entries(countedCards).map(([key, val]) => {
    return { [key]: val };
  });
  const sortedCount = countArr.toSorted((a, b) => {
    const first = Object.values(a)[0];
    const second = Object.values(b)[0];
    if (second - first === 0) {
      if (suits.indexOf(Object.keys(a)[0]) > suits.indexOf(Object.keys(b)[0])) {
        return 1;
      } else if (
        suits.indexOf(Object.keys(a)[0]) < suits.indexOf(Object.keys(b)[0])
      ) {
        return -1;
      }
    }
    return second - first;
  });
  let omitJ = countedCards;
  if (Object.keys(sortedCount[0])[0] !== 'J') {
    countedCards[Object.keys(sortedCount[0])[0]] += countedCards['J'] || 0;
    omitJ = omit(countedCards, 'J');
  } else if (sortedCount.length > 1) {
    countedCards[Object.keys(sortedCount[1])[0]] += countedCards['J'] || 0;
    omitJ = omit(countedCards, 'J');
  }
  const howManyCounts = countBy(Object.values(omitJ), (el) => el);
  for (let i = 0; i < allPlayPossible.length; i++) {
    if (isEqual(allPlayPossible[i], howManyCounts)) {
      return i;
    }
  }
  return -1;
}
