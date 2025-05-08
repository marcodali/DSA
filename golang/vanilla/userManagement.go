package main

import "fmt"

type User struct {
	ID   int
	Name string
	Age  int
}

type UserManager []User

var lastID int = 0

func nextId() int {
	lastID++
	return lastID
}

func (m *UserManager) CreateUser(name string, age int) (error, *User) {
	if age <= 0 {
		return fmt.Errorf("Cannot create user %s with age %d", name, age), nil
	}
	brandNewUser := User{ID: nextId(), Name: name, Age: age}
	*m = append(*m, brandNewUser)
	return nil, &brandNewUser
}

func (m *UserManager) GetUser(id int) (error, *User) {
	users := *m // Temporal para evitar repetir (*m)
	for i := range users {
		if users[i].ID == id {
			return nil, &users[i] // Puntero al elemento del slice
		}
	}
	return fmt.Errorf("Cannot find user with id %d", id), nil
}

func (m *UserManager) UpdateUser(id int, name string, age int) error {
	err, user := m.GetUser(id)
	if err != nil {
		return err
	}
	if age <= 0 {
		return fmt.Errorf("Cannot update user %s with age %d", user.Name, age)
	}
	user.Name = name
	user.Age = age
	return nil
}

func (m *UserManager) DeleteUser(id int) error {
	err, _ := m.GetUser(id)
	if err != nil {
		return err
	}
	for i, user := range *m {
		if user.ID == id {
			*m = append((*m)[:i], (*m)[i+1:]...)
			break
		}
	}
	return nil
}

func main() {
	userManager := UserManager{}

	err, juan := userManager.CreateUser("Juan", 20)
	if err != nil {
		fmt.Println("Error:", err)
	}
	err, ana := userManager.CreateUser("Ana", 10)
	if err != nil {
		fmt.Println("Error:", err)
	}
	err, _ = userManager.CreateUser("Paco", -1)
	if err != nil {
		fmt.Println("Error:", err)
	}
	err, ursula := userManager.CreateUser("Ursula", 66)
	if err != nil {
		fmt.Println("Error:", err)
	}

	fmt.Println("")

	err, maybeAna := userManager.GetUser(ana.ID)
	if err != nil {
		fmt.Println("Error:", err)
	}
	fmt.Println("Debe ser Ana", *maybeAna)
	err, maybeJuan := userManager.GetUser(juan.ID)
	if err != nil {
		fmt.Println("Error:", err)
	}
	fmt.Println("Debe ser Juan", *maybeJuan)

	userManager.UpdateUser(ana.ID, "Ana Maria", 77)
	err = userManager.UpdateUser(juan.ID, "Juan Pablo II", -2)
	if err != nil {
		fmt.Println("Error:", err)
	}

	fmt.Println("Antes de borrar a Ursula")
	fmt.Println(userManager)

	userManager.DeleteUser(ursula.ID)
	err = userManager.DeleteUser(999)
	if err != nil {
		fmt.Println("Error:", err)
	}

	fmt.Println("Despues de borrar a Ursula")
	fmt.Println(userManager)
}
