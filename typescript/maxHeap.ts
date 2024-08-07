class MaxHeap {
    private h: number[] = [];
    private swap(x: number, y: number): void {
        [this.h[x], this.h[y]] = [this.h[y], this.h[x]];
    }
    size(): number {
        return this.h.length;
    }
    push(v: number): void {
        if (!Number.isSafeInteger(v)) throw new Error("only safe integers allowed");
        this.h.push(v);
        this.bubbleUp(this.h.length - 1);
    }
    private bubbleUp(i: number) {
        while (i > 0) {
            const p = Math.floor((i-1)/2);
            if (this.h[i] <= this.h[p]) break;
            this.swap(i, p);
            i = p;
        }
    }
    pop(): number | undefined {
        if (this.h.length > 1) {
            const max = this.h[0];
            this.h[0] = this.h.pop()!;
            this.sinkDown(0);
            return max;
        }
        return this.h.pop();
    }
    private sinkDown(i: number): void {
        let max = i;
        const [l, r] = [1, 2].map(v => i * 2 + v);
        if (l < this.size() && this.h[l] > this.h[max]) max = l;
        if (r < this.size() && this.h[r] > this.h[max]) max = r;
        if (max !== i) {
            this.swap(max, i);
            this.sinkDown(max);
        }
    }
}

const arr = [7, -1, 3, -11, 8, 28, 38, -40, 0, 2, -5];
let k = 1;

/**
 * Problem: Calculate the kth smallest item in the array
 */
// solution [1] fixed window size
const h1 = new MaxHeap();
for (const item of arr) {
    h1.push(item);
    if (h1.size() > k) h1.pop();
}
console.log(`${k}th smallest item is ${h1.pop()}`);
// solution [2] k calls to pop
const h2 = new MaxHeap();
for (const item of arr) h2.push(-item);
for (let i = 1; i < k; i += 1) h2.pop();
console.log(`${k}th smallest item is ${-h2.pop()!}`)

/**
 * Problem: Calculate the kth largest item in the array
 */
// solution [1] fixed window size
const h3 = new MaxHeap();
for (const item of arr) {
    h3.push(-item);
    if (h3.size() > k) h3.pop();
}
console.log(`${k}th largest item is ${-h3.pop()!}`);
// solution [2] k calls to pop
const h4 = new MaxHeap();
for (const item of arr) h4.push(item);
for (let i = 1; i < k; i += 1) h4.pop();
console.log(`${k}th largest item is ${h4.pop()!}`)
