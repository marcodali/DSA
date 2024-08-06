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

	size(): number {
		return this.h.length;
	}

	swap(x: number, y: number): void {
		[this.h[x], this.h[y]] = [this.h[y], this.h[x]];
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

	pop(): number | undefined {
		if (this.h.length > 1) {
			const max = this.h[0];
			this.h[0] = this.h.pop() as number;
			this.sinkDown(0);
			return max;
		}
		return this.h.pop();
	}

	sinkDown(i: number): void {
		let lai = i;
		const [l, r] = [1, 2].map(v => 2 * i + v);
		if (l < this.h.length && this.h[l] > this.h[lai]) lai = l;
		if (r < this.h.length && this.h[r] > this.h[lai]) lai = r;
		if (lai !== i) {
			this.swap(i, lai);
			this.sinkDown(lai);
		}
	}
}

// complex strucure with nested arrays
const s = [
	-5, -21,
	[
		7, -71, 2,
	],
	[
		[-1, 0, -10, 25],
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

// find kth smallest element using fixed size max heap approach
let k = 2;
const h = new MaxHeap();

for (const v of flatten) {
	h.push(v);
	if (h.size() > k) h.pop();
}
console.log(`${k}th smallest element is`, h.pop());

// find kth largest element using k calls to pop (max heap)
k = 3;
const h2 = new MaxHeap();
for (const v of flatten) h2.push(v);
for (let i = 1; i < k; i++) h2.pop();
console.log(`${k}th largest element is`, h2.pop());

// find kth largest element using fixed size min heap approach
k = 1;
const h3 = new MaxHeap();
for (const v of flatten) {
	h3.push(-v);
	if (h3.size() > k) h3.pop();
}
console.log(`${k}th largest element is`, -h3.pop()!);

// find kth smallest element using k calls to pop (min heap)
k = 4;
const h4 = new MaxHeap();
for (const v of flatten) h4.push(-v);
for (let i = 1; i < k; i++) h4.pop();
console.log(`${k}th smallest element is`, -h4.pop()!);