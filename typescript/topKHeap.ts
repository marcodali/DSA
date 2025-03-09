class MaxHeap {
    private h: number[] = [];
    private swap = (a: number, b: number) => [this.h[a], this.h[b]] = [this.h[b], this.h[a]];

    constructor(...values: number[]) {
        values.forEach(value => this.pushea(value));
    }
    get size() {
        return this.h.length;
    }
    pushea(v: number): void {
        this.h.push(v);
        this.bubbleUp(this.size - 1);
    }
    popea(): number | undefined {
        if (this.size > 1) {
            const max = this.h[0];
            this.h[0] = this.h.pop()!;
            this.sinkDown(0);
            return max;
        }
        return this.h.pop();
    }
    private bubbleUp(i: number): void {
        while (i > 0) {
            const p = Math.floor((i-1)/2);
            if (this.h[i] <= this.h[p]) break;
            this.swap(i, p);
            i = p;
        }
    }
    private sinkDown(i: number): void {
        let max = i;
        const [l, r] = [1, 2].map(v => i * 2 + v);
        if (l < this.size && this.h[l] > this.h[max]) max = l;
        if (r < this.size && this.h[r] > this.h[max]) max = r;
        if (max !== i) {
            this.swap(max, i);
            this.sinkDown(max);
        }
    }
}

let k = 2;
const arr = [6, -2, 1, 90, 7, -25, 14, -12, 99, -100];

// smallest using fixed window size algorithm
const h1 = new MaxHeap();
arr.forEach(item => (h1.pushea(item), h1.size > k && h1.popea()));
console.log(`${k}th smallest is ${h1.popea()}`);

// largest using k calls to pop
const h2 = new MaxHeap(...arr);
Array.from({length: k-1}, () => h2.popea());
console.log(`${k}th largest is ${h2.popea()}`);
