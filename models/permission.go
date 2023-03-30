package models

import (
	"fmt"
	"time"

	"github.com/pnnh/quantum-go/server/helpers"
	"github.com/pnnh/quantum-go/services/datastore"

	"github.com/jmoiron/sqlx"
)

type PermissionModel struct {
	Pk          string    `json:"pk"`
	Name        string    `json:"name"`
	CreateTime  time.Time `json:"create_time" db:"create_time"`
	UpdateTime  time.Time `json:"update_time" db:"update_time"`
	Description string    `json:"description"`
}

func NewPermissionModel(name string) *PermissionModel {
	model := &PermissionModel{
		Pk:         helpers.NewPostId(),
		Name:       name,
		CreateTime: time.Now(),
		UpdateTime: time.Now(),
	}

	return model
}

func GetPermission(pk string) (*PermissionModel, error) {
	sqlText := `select * from permissions where pk = :pk;`

	sqlParams := map[string]interface{}{"pk": pk}
	var sqlResults []*PermissionModel

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

func SelectPermissions(offset int, limit int) ([]*PermissionModel, error) {
	sqlText := `select * from permissions offset :offset limit :limit;`

	sqlParams := map[string]interface{}{"offset": offset, "limit": limit}
	var sqlResults []*PermissionModel

	rows, err := datastore.NamedQuery(sqlText, sqlParams)
	if err != nil {
		return nil, fmt.Errorf("NamedQuery: %w", err)
	}
	if err = sqlx.StructScan(rows, &sqlResults); err != nil {
		return nil, fmt.Errorf("StructScan: %w", err)
	}

	return sqlResults, nil
}

func CountPermissions() (int64, error) {
	sqlText := `select count(1) as count from permissions;`

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
