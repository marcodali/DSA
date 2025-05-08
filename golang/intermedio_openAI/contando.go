package main

import "fmt"

func countToN(n int) []int {
	slice := []int{}
	canal := make(chan int)

	go func() {
		for i := range n {
			canal <- i + 1
		}
		close(canal)
	}()

	for {
		if number, ok := <-canal; ok {
			slice = append(slice, number)
		} else {
			break
		}
	}

	return slice
}

func main() {
	res := countToN(5)
	fmt.Println(res) // [1 2 3 4 5]
}
