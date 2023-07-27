package models

import (
	"fmt"
	"time"

	"github.com/jmoiron/sqlx"
	"github.com/pnnh/quantum-go/services/datastore"
)

type CaptchaModel struct {
	Pk         string    `json:"pk" db:"pk"`
	Content    string    `json:"content"`
	CreateTime time.Time `json:"create_time" db:"create_time"`
	UpdateTime time.Time `json:"update_time" db:"update_time"`
	Checked    int       `json:"checked"`
}

func PutCaptcha(model *CaptchaModel) error {
	sqlText := `insert into captcha(pk, create_time, update_time, content, checked)
	values(:pk, :create_time, :update_time, :content, :checked)`

	sqlParams := map[string]interface{}{
		"pk":          model.Pk,
		"create_time": model.CreateTime,
		"update_time": model.UpdateTime,
		"content":     model.Content,
		"checked":     model.Checked,
	}

	_, err := datastore.NamedExec(sqlText, sqlParams)
	if err != nil {
		return fmt.Errorf("PutCaptcha: %w", err)
	}
	return nil

}

func FindCaptcha(key string) (*CaptchaModel, error) {

	sqlText := `select * from captcha where pk = :pk;`

	sqlParams := map[string]interface{}{"pk": key}
	var sqlResults []*CaptchaModel

	rows, err := datastore.NamedQuery(sqlText, sqlParams)
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

func UpdateCaptcha(key string, checked int) error {

	sqlText := `update captcha set update_time=:update_time, checked=:checked
	where pk = :pk;`

	sqlParams := map[string]interface{}{
		"pk":          key,
		"update_time": time.Now(),
		"checked":     checked,
	}

	_, err := datastore.NamedExec(sqlText, sqlParams)
	if err != nil {
		return fmt.Errorf("UpdateAccountPassword: %w", err)
	}
	return nil

}
