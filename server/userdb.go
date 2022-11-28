package server

import (
	"fmt"
	"quantum/models"
	"sync"
)

type userdb struct {
	users map[string]*models.UserModel
	mu    sync.RWMutex
}

var db *userdb

// DB returns a userdb singleton
func DB() *userdb {

	if db == nil {
		db = &userdb{
			users: make(map[string]*models.UserModel),
		}
	}

	return db
}

// GetUser returns a *User by the user's username
func (db *userdb) GetUser(name string) (*models.UserModel, error) {

	db.mu.Lock()
	defer db.mu.Unlock()
	user, ok := db.users[name]
	if !ok {
		return &models.UserModel{}, fmt.Errorf("error getting user '%s': does not exist", name)
	}

	return user, nil
}

// PutUser stores a new user by the user's username
func (db *userdb) PutUser(user *models.UserModel) {

	db.mu.Lock()
	defer db.mu.Unlock()
	db.users[user.Name] = user
}
