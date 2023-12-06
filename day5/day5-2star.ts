import { readFileSync } from 'node:fs';

export async function resultOutput(fileName: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const textFile = readFileSync(__dirname + '\\' + fileName, 'utf-8');
    const allData = textFile.split('\n\n');
    const parsedSeeds = allData[0]
      .split(':')[1]
      .split(' ')
      .filter((val) => !!val)
      .map((val) => parseInt(val));
    allData.shift();
    const seedNumbers: { start: number; range: number }[] = [];
    for (let l = 0; l < parsedSeeds.length; l += 2) {
      seedNumbers.push({ start: parsedSeeds[l], range: parsedSeeds[l + 1] });
    }
    console.log(seedNumbers);
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
    seedNumbers.forEach((seed) => {
      let location = seed.start;
      for (let map in allMaps) {
        const currMap = allMaps[map].map((vals) => {
          return { destStart: vals[0], sourceStart: vals[1], range: vals[2] };
        });
        for (let i = 0; i < currMap.length; i++) {
          const track = currMap[i];
          if (
            track.sourceStart <= location &&
            track.sourceStart + track.range >= location
          ) {
            location = track.destStart + (location - track.sourceStart);
            break;
          } else if (
            track.sourceStart <= location + seed.range &&
            track.sourceStart + track.range >= location + seed.range
          ) {
            location = track.destStart;
            break;
          } else if (
            track.sourceStart > location &&
            track.sourceStart + track.range < location + seed.range
          ) {
            location = track.destStart;
            break;
          }
          console.log(location, track);
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
  const res = await resultOutput('test.txt');
  console.log(res);
})();
