package models

import (
	"database/sql"
	"time"
)

type PictureSqlResult struct {
	Pk          string         `json:"pk" gorm:"primaryKey"`
	Title       string         `json:"title"`
	CreateTime  time.Time      `json:"create_time" db:"create_time"`
	UpdateTime  time.Time      `json:"update_time" db:"update_time"`
	Creator     string         `json:"creator"`
	Description sql.NullString `json:"description"`
	File        sql.NullString `json:"file"`
	Uri         sql.NullString `json:"uri"`
	Status      int            `json:"status"`
}

type PictureJsonView struct {
	PictureSqlResult
	Uri         string `json:"uri"`
	Pk          string  `json:"pk"`
	Title       string  `json:"title"`
	CreateTime  string  `json:"create_time"`
	UpdateTime  string  `json:"update_time"`
	Creator     string  `json:"creator"`
	Description string `json:"description"`
	File        string  `json:"file"`
	Status      int    `json:"status"`
}

type EmotionsQueryResult struct {
	Emotions []map[string]interface{} `json:"emotions,omitempty"`
}

type PictureGroupSqlResult struct {
	Pk          string         `json:"pk"`
	Title       string         `json:"title"`
	CreateTime  time.Time      `json:"create_time" db:"create_time"`
	UpdateTime  time.Time      `json:"update_time" db:"update_time"`
	Creator     string         `json:"creator"`
	Description sql.NullString `json:"description"`
	Count       int            `json:"count"`
	OrderNumber int            `json:"order_number"  db:"order_number"`
}

type PictureGroupJsonView struct {
	PictureGroupSqlResult
	Pk          string  `json:"pk"`
	Title       string  `json:"title"`
	CreateTime  string  `json:"create_time"`
	UpdateTime  string  `json:"update_time"`
	Creator     string  `json:"creator"`
	Description string `json:"description"`
	Count       int    `json:"count"`
}

