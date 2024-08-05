import heapq

def popupgreat(myheap, k):
  # same algorithm as popup but with negative numbers
  z = [-i for i in myheap]
  heapq.heapify(z)
  for _ in range(k-1):
    heapq.heappop(z)
  print(-heapq.heappop(z))

def pushdowngreat(myheap, k):
  # same algorithm as pushdown but with positive numbers
  mh = []
  for i in myheap:
    heapq.heappush(mh, i)
    if len(mh) > k:
      heapq.heappop(mh)
  print(mh[0])

def pushdown(myheap, k):
  # we will use a max heap instead of a min heap
  mh = []
  for i in myheap:
    heapq.heappush(mh, -i)
    if len(mh) > k:
      heapq.heappop(mh)
  print(-mh[0])

def popup(myheap, k):
  # we will use a min heap
  heapq.heapify(myheap)
  for i in range(k-1):
    heapq.heappop(myheap)
  print(heapq.heappop(myheap))

def trampa(nums, k):
  print(heapq.nsmallest(k, [n for row in nums for n in row])[-1])

def normal(nums, k):
  # print the heap
  print(nums)
  # create a heap
  heapq.heapify(nums)
  # print the heap
  print(nums)
  # print the k smallest numbers
  print(heapq.nsmallest(k, nums))
  # print the k largest numbers
  print(heapq.nlargest(k, nums))

if __name__ == '__main__':
  # create a list of 10 numbers
  nums = [12, 3, -2, 6, 4, 8, 9, 10, 14, 1]
  #normal(nums, 3)
  
  # bidimensional list
  matrix = [
    [12, 3, -2, 6, 4],
    [8, 9, -10, 14, 1],
    [0, 2, 5, -7, 11],
    [13, 15, -6, 7, 10],
  ]

  # find the 9th smallest number
  #popup([number for row in matrix for number in row], 9)

  # find the 2nd smallest number
  #trampa(matrix, 2)

  multi_matrix = [
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ],
    [
      [11, 12, 10],
      [13, 15],
      [-6, -7, -10]
    ],
    [
      [14, -2],
    ]
  ]

  # find the 1st smallest number
  #pushdown([number for matrix in multi_matrix for row in matrix for number in row], 1)

  # find the 4st greatest number
  pushdowngreat([number for matrix in multi_matrix for row in matrix for number in row], 4)
  popupgreat([number for matrix in multi_matrix for row in matrix for number in row], 4)