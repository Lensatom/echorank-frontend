import * as illustrations from "../assets"

function hash53(str: string, seed = 0): number {
  let h1 = 0xdeadbeef ^ seed
  let h2 = 0x41c6ce57 ^ seed
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i)
    h1 = Math.imul(h1 ^ ch, 2654435761)
    h2 = Math.imul(h2 ^ ch, 1597334677)
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909)

  return (h2 & 0x1fffff) * 0x100000000 + (h1 >>> 0)
}

export const idToNumber = (id: string): 1|2|3|4|5|6|7|8|9|10 => {
  const h = hash53(id)
  return ((h % 10) + 1) as 1|2|3|4|5|6|7|8|9|10
}


export const getPollImage = (id: string): string => {

  const illustrationMap: Record<
    1|2|3|4|5|6|7|8|9|10,
    string
  > = {
    1: illustrations.ForestBro,
    2: illustrations.ForestPana,
    3: illustrations.ForestRafiki,
    4: illustrations.HappySunRafiki,
    5: illustrations.MangoTreeAmico,
    6: illustrations.SpringFlowerCuate,
    7: illustrations.SpringFlowerPana,
    8: illustrations.StrelitziaPlantRafiki,
    9: illustrations.SunsetPana,
    10: illustrations.WindTurbineCuate,
  }
  const number: 1|2|3|4|5|6|7|8|9|10 = idToNumber(id) as 1|2|3|4|5|6|7|8|9|10
  return illustrationMap[number]
}