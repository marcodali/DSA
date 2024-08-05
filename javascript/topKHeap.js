class Heap {
  constructor() { this.heap = [] }
  push(val) {
    this.heap.push(val);
    let idx = this.heap.length - 1, pIdx;
    while (idx > 0 && this.heap[idx] > this.heap[pIdx = Math.floor((idx - 1) / 2)]) {
      [this.heap[idx], this.heap[pIdx]] = [this.heap[pIdx], this.heap[idx]];
      idx = pIdx;
    }
  }
  pop() {
    const max = this.heap[0], end = this.heap.pop();
    if (this.heap.length) {
      this.heap[0] = end;
      this.sinkDown(0);
    }
    return max;
  }
  sinkDown(idx) {
    const length = this.heap.length;
    let largest = idx, left = 2 * idx + 1, right = 2 * idx + 2;
    if (left < length && this.heap[left] > this.heap[largest]) largest = left;
    if (right < length && this.heap[right] > this.heap[largest]) largest = right;
    if (largest !== idx) {
      [this.heap[idx], this.heap[largest]] = [this.heap[largest], this.heap[idx]];
      this.sinkDown(largest);
    }
  }
}

// Example usage:
const myArray = [1, 0, -3, -6, -5, 4, -10, 500, -1];
const k = 8;

// find kth smallest element approach with fixed size heap
const minHeap = new Heap();
for (const num of myArray) {
  minHeap.push(num);
  if (minHeap.heap.length > k) {
    minHeap.pop();
  }
}
console.log(`k=${k}th smallest element is ${minHeap.heap[0]}`);

// find kth largest element approach with fixed size heap
const maxHeap = new Heap();
for (const num of myArray) {
  maxHeap.push(-num);
  if (maxHeap.heap.length > k) {
    maxHeap.pop();
  }
}
console.log(`k=${k}th greatest element is ${-maxHeap.heap[0]}`);

// find kth greatest element approach with k-1 calls to pop
const h = new Heap();
for (const num of myArray) {
  h.push(num);
}
for (let i = 0; i < k - 1; i++) {
  h.pop();
}
console.log(`k=${k}th greatest element is ${h.pop()}`);

// find kth smallest element approach with k-1 calls to pop
const mHeap = new Heap();
for (const num of myArray) {
  mHeap.push(-num);
}
for (let i = 0; i < k - 1; i++) {
  mHeap.pop();
}
console.log(`k=${k}th smallest element is ${-mHeap.pop()}`);
