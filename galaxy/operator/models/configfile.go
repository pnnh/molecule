package models

import "time"

type ConfigFileModel struct {
	Pk          string    `json:"pk" db:"pk"`
	Name        string    `json:"name" db:"name"`
	Content     string    `json:"content" db:"content"`
	CreateTime  time.Time `json:"create_time" db:"create_time"`
	UpdateTime  time.Time `json:"update_time" db:"update_time"`
	Description string    `json:"description" db:"description"`
	Mime        string    `json:"mime" db:"mime"`
	Version     int       `json:"version" db:"version"`
	Creator     int64     `json:"creator" db:"creator"`
	Status      int       `json:"status" db:"status"`
}
