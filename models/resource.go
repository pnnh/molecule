package models

import (
	"database/sql"
	"strings"
	"time"
)

type ResourceTable struct {
	Pk          string
	CreateAt    time.Time `db:"createat"`
	UpdateAt    time.Time `db:"updateat"`
	Title       string
	Description sql.NullString
	Creator     string
	Owner       sql.NullString
	Path        sql.NullString
	Tags        sql.NullString
	Body        sql.NullString
	Header      string
	Version     sql.NullInt16
	Extend      sql.NullString
	Keywords    sql.NullString `json:"keywords"`
	Status      sql.NullInt32  `json:"status"`
	Cover       sql.NullString
}

type ResourceModel struct {
	ResourceTable
	NickName sql.NullString `json:"nickname"`
}

func (model *ResourceModel) ToJsonView() *ResourceJsonView {
	return &ResourceJsonView{
		Pk:           model.Pk,
		Title:        model.Title,
		Body:         model.Body.String,
		Header:       model.Header,
		CreateAt:     model.CreateAt.Format(time.RFC3339),
		UpdateAt:     model.UpdateAt.Format(time.RFC3339),
		KeywordsList: strings.Split(model.Keywords.String, ","),
		Status:       int(model.Status.Int32),
		Creator:      model.Creator,
		Keywords:     model.Keywords.String,
		Description:  model.Description.String,
		Cover:        model.Cover.String,
		Version:      int(model.Version.Int16),
		Extend:       model.Extend.String,
	}
}

type ResourceJsonView struct {
	Pk           string   `json:"pk"`
	CreateAt     string   `json:"createat"`
	UpdateAt     string   `json:"updateat"`
	Title        string   `json:"title"`
	Description  string   `json:"description"`
	Creator      string   `json:"creator"`
	Owner        string   `json:"owner"`
	Path         string   `json:"path"`
	Tags         string   `json:"tags"`
	Body         string   `json:"body"`
	Header       string   `json:"header"`
	Version      int      `json:"version"`
	Status       int      `json:"status"`
	Extend       string   `json:"extend"`
	Cover        string   `json:"cover"`
	Keywords     string   `json:"keywords"`
	KeywordsList []string `json:"keywords_list"`
}
