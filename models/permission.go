package models

import (
	"time"
)

type PermissionModel struct {
	Pk          string    `json:"pk"`
	Name        string    `json:"name"`
	CreateTime  time.Time `json:"create_time" db:"create_time"`
	UpdateTime  time.Time `json:"update_time" db:"update_time"`
	Description string    `json:"description"`
}
