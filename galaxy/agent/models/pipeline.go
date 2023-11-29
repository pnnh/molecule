package models

import "time"

type PipelineModel struct {
	Id          int64             `json:"id"`
	Name        string            `json:"name"`
	Description string            `json:"description"`
	CreateTime  time.Time         `json:"create_time"`
	UpdateTime  time.Time         `json:"update_time"`
	Status      int               `json:"status"`
	Stages      []*StageModel     `json:"stages"`
	Parameters  map[string]string `json:"parameters"`
}

type StageModel struct {
	Id          int64       `json:"id"`
	Name        string      `json:"name"`
	Description string      `json:"description"`
	CreateTime  time.Time   `json:"create_time"`
	UpdateTime  time.Time   `json:"update_time"`
	Status      int         `json:"status"`
	Pipeline    int64       `json:"pipeline"`
	Jobs        []*JobModel `json:"jobs"`
}

type JobModel struct {
	Id          int64        `json:"id"`
	Name        string       `json:"name"`
	Description string       `json:"description"`
	CreateTime  time.Time    `json:"create_time"`
	UpdateTime  time.Time    `json:"update_time"`
	Status      int          `json:"status"`
	Stage       int64        `json:"stage"`
	Tasks       []*TaskModel `json:"tasks"`
}

type TaskModel struct {
	Id          int64     `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	CreateTime  time.Time `json:"create_time"`
	UpdateTime  time.Time `json:"update_time"`
	Status      int       `json:"status"`
	Job         int64     `json:"job"`
	Script      string    `json:"script"`
}
