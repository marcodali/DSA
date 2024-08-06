/**
 * This recursive function will flatten any nested array of numbers
 */
const flat = (a: (number | any[])[]): number[] => {
	const res: number[] = [];
	for (const item of a) {
		if (Number.isInteger(item)) {
			res.push(item as number);
		} else if (Array.isArray(item)) {
			res.push(...flat(item));
		} else {
			throw new Error(`cannot parse "${typeof item}" only number and array allowed`);
		}
	}
	return res;
}

/**
 * This is a max heap implementation in TypeScript
 * because the greatest element is always the root (index 0)
 */
class MaxHeap {
	private h: number[] = [];

	swap(x: number, y: number): void {
		[this.h[x], this.h[y]] = [this.h[y], this.h[x]]
	}

	push(v: number): void {
		if (!Number.isSafeInteger(v)) throw new Error("only safe integers allowed");
		
		this.h.push(v);
		let i = this.h.length - 1;
		while (i > 0) {
			const p = Math.floor((i - 1) / 2);
			if (this.h[i] <= this.h[p]) break;
			this.swap(i, p);
			i = p;
		}
	}
}

// complex strucure with nested arrays
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