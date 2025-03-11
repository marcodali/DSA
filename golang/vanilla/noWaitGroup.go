package main

import (
	"fmt"
	"math/rand/v2"
)

const N = 10

func main() {
	var even_numbers []int
	var odd_numbers []int
	var random_numbers [N]int
	numbers := make(chan int)
	wait_goroutine_to_finish := make(chan bool, 2)

	for i := range N {
		random_numbers[i] = rand.IntN(100)
	}
	fmt.Println("random_numbers", random_numbers)

	go (func() {
		defer func() { wait_goroutine_to_finish <- true }()
		for i := range N {
			numbers <- random_numbers[i]
		}
	})()

	go (func() {
		defer func() { wait_goroutine_to_finish <- true }()
		for range N {
			number := <-numbers
			if number&1 == 0 {
				even_numbers = append(even_numbers, number)
			} else {
				odd_numbers = append(odd_numbers, number)
			}
		}
	})()

	<-wait_goroutine_to_finish
	<-wait_goroutine_to_finish

	fmt.Println("pares", even_numbers)
	fmt.Println("impares", odd_numbers)
}
