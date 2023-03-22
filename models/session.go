package models

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/jmoiron/sqlx"
	"github.com/pnnh/quantum-go/services/sqlxsvc"
)

type SessionModel struct {
	Pk         string         `json:"pk"`
	Content    string         `json:"content"`
	CreateTime time.Time      `json:"create_time" db:"create_time"`
	UpdateTime time.Time      `json:"update_time" db:"update_time"`
	User       string         `json:"user"`
	Type       string         `json:"type"`
	Code       sql.NullString `json:"code"`
}

func PutSession(model *SessionModel) error {
	sqlText := `insert into sessions(pk, content, create_time, update_time, "user", type, code) 
	values(:pk, :content, :create_time, :update_time, :user, :type, :code)`

	sqlParams := map[string]interface{}{"pk": model.Pk, "content": model.Content, "create_time": model.CreateTime,
		"update_time": model.UpdateTime, "user": model.User, "type": model.Type,
		"code": model.Code.String}

	_, err := sqlxsvc.NamedExec(sqlText, sqlParams)
	if err != nil {
		return fmt.Errorf("PutSession: %w", err)
	}
	return nil
}

func GetSession(pk string) (*SessionModel, error) {
	sqlText := `select * from sessions where pk = :pk;`

	sqlParams := map[string]interface{}{"pk": pk}
	var sqlResults []*SessionModel

	rows, err := sqlxsvc.NamedQuery(sqlText, sqlParams)
	if err != nil {
		return nil, fmt.Errorf("NamedQuery: %w", err)
	}
	if err = sqlx.StructScan(rows, &sqlResults); err != nil {
		return nil, fmt.Errorf("StructScan: %w", err)
	}

	for _, v := range sqlResults {
		return v, nil
	}

	return nil, nil
}
