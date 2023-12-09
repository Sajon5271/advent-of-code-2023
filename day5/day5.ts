import { readFileSync } from 'node:fs';

export async function resultOutput(fileName: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const textFile = readFileSync(__dirname + '\\' + fileName, 'utf-8');
    const allData = textFile.split('\n\n');
    const seedNumbers = allData
      .shift()
      ?.split(':')[1]
      .split(' ')
      .filter((val) => !!val)
      .map((val) => parseInt(val));
    const allMaps: { [key: string]: number[][] } = allData.reduce(
      (agg, curr) => {
        const splitValName = curr.split(':');
        return {
          ...agg,
          [splitValName[0]]: splitValName[1]
            .split('\n')
            .filter((el) => !!el)
            .map((val) => {
              return val
                .split(' ')
                .filter((el) => !!el)
                .map((x) => parseInt(x));
            }),
        };
      },
      {}
    );
    const locationList: number[] = [];
    seedNumbers?.forEach((seed, idxxx) => {
      let location = seed;
      for (let map in allMaps) {
        for (let i = 0; i < allMaps[map].length; i++) {
          if (
            allMaps[map][i][1] <= location &&
            location < allMaps[map][i][1] + allMaps[map][i][2]
          ) {
            location = allMaps[map][i][0] + (location - allMaps[map][i][1]);
            break;
          }
        }
      }
      locationList.push(location);
    });
    console.log(locationList);
    const lowest = locationList.sort((a, b) => a - b)[0];
    resolve(lowest);
  });
}

(async function () {
  const res = await resultOutput('input-day5.txt');
  console.log(res);
})();
