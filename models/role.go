package models

import (
	"fmt"
	"time"

	"github.com/pnnh/quantum-go/services/datastore"

	"github.com/jmoiron/sqlx"
)

type RoleModel struct {
	Pk          string    `json:"pk"`
	Name        string    `json:"name"`
	CreateTime  time.Time `json:"create_time" db:"create_time"`
	UpdateTime  time.Time `json:"update_time" db:"update_time"`
	Description string    `json:"description"`
}

func GetRole(pk string) (*RoleModel, error) {
	sqlText := `select * from roles where pk = :pk;`

	sqlParams := map[string]interface{}{"pk": pk}
	var sqlResults []*RoleModel

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

func SelectRoles(offset int, limit int) ([]*RoleModel, error) {
	sqlText := `select * from roles offset :offset limit :limit;`

	sqlParams := map[string]interface{}{"offset": offset, "limit": limit}
	var sqlResults []*RoleModel

	rows, err := datastore.NamedQuery(sqlText, sqlParams)
	if err != nil {
		return nil, fmt.Errorf("NamedQuery: %w", err)
	}
	if err = sqlx.StructScan(rows, &sqlResults); err != nil {
		return nil, fmt.Errorf("StructScan: %w", err)
	}

	return sqlResults, nil
}

func CountRoles() (int64, error) {
	sqlText := `select count(1) as count from roles;`

	sqlParams := map[string]interface{}{}
	var sqlResults []struct {
		Count int64 `db:"count"`
	}

	rows, err := datastore.NamedQuery(sqlText, sqlParams)
	if err != nil {
		return 0, fmt.Errorf("NamedQuery: %w", err)
	}
	if err = sqlx.StructScan(rows, &sqlResults); err != nil {
		return 0, fmt.Errorf("StructScan: %w", err)
	}
	if len(sqlResults) == 0 {
		return 0, nil
	}

	return sqlResults[0].Count, nil
}
