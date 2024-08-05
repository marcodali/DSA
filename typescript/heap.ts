const flat = (a: any[]): number[] => {
  let res: number[] = [];
  for (const item of a) {
      if (Number.isInteger(item)) {
          res.push(item);
      } else if (Array.isArray(item)) {
          res = res.concat(flat(item));
      } else {
          throw new Error(`cannot parse "${typeof item}" only number and array allowed`);
      }
  }
  return res;
}

class MinHeap {
  private h: number[];
  
  constructor() {
      this.h = [];
  }

  push(v: number): void {
      if (!Number.isInteger(v)) {
          throw new Error("only numbers allowed");
      }
      this.h.push(v);
  }
}

// flat the nested strucure and fill the heap
const s = [
  -5, -20,
  [
      7, -7, 2,
  ],
  [
      [-1, 0, -10, 20],
      [8],
      [],
      [11, 3]
  ],
  [
      [
          [
              [
                  -4, 6,
              ]
          ]
      ]
  ]
];

const flatten = flat(s);
console.log("flaten array", flatten);