import { readFileSync } from 'node:fs';

export async function resultOutput(fileName: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const textFile = readFileSync(__dirname + '\\' + fileName, 'utf-8');
    const dataArr = textFile.split('\n').map(
      (
        el,
        idx
      ): {
        count: number;
        cardNo: number;
        winningCards: number[];
        playerCards: number[];
      } => {
        const cards = el.split(':')[1].split('|');
        return {
          count: 1,
          cardNo: idx + 1,
          winningCards: cards[0]
            .split(' ')
            .filter((x) => !!x)
            .map((num) => parseInt(num)),
          playerCards: cards[1]
            .split(' ')
            .filter((x) => !!x)
            .map((num) => parseInt(num)),
        };
      }
    );
    dataArr.forEach((val, idx) => {
      let matched = 0;
      val.winningCards.forEach((cardVal) => {
        if (val.playerCards.indexOf(cardVal) !== -1) matched++;
      });
      for (let i = idx + 1; i < idx + matched + 1; i++) {
        dataArr[i].count += val.count;
      }
    });
    const total = dataArr.reduce((acc, curr) => acc + curr.count, 0);
    resolve(total);
  });
}

(async function () {
  const res = await resultOutput('input-day4.txt');
  console.log(res);
})();
