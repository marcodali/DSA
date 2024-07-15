class Heap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  // bubbleUp iterative version
  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const element = this.heap[index],
        parentIndex = Math.floor((index - 1) / 2),
        parent = this.heap[parentIndex];
      if (parent >= element) break;
      this.heap[index] = parent;
      this.heap[parentIndex] = element;
      index = parentIndex;
    }
  }

  pop() {
    const max = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.sinkDown(0);
    }
    return max;
  }

  // sinkDown recursive version
  sinkDown(index) {
    let left = 2 * index + 1,
      right = 2 * index + 2,
      largest = index;

    const length = this.heap.length;

    if (left <= length && this.heap[left] > this.heap[largest]) {
      largest = left;
    }
    if (right <= length && this.heap[right] > this.heap[largest]) {
      largest = right;
    }
    if (largest !== index) {
      [this.heap[largest], this.heap[index]] = [this.heap[index], this.heap[largest]];
      this.sinkDown(largest);
    }
  }
}

// Example usage:
const myArray = [1, 0, -3, -6, -5, 4, -10, 500, -1];
const k = 6;

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
