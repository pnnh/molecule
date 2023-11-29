package services

import (
	"fmt"

	"galaxy-operator/models"

	"github.com/jmoiron/sqlx"
	"github.com/pnnh/quantum/golang/neutron/services/datastore"
)

func FindConfigFile(name string) (*models.ConfigFileModel, error) {
	sqlText := `select * from config_files where name = :name limit 1;`

	sqlParams := map[string]interface{}{"name": name}
	var sqlResults []*models.ConfigFileModel

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

func SelectConfigFiles(offset int, limit int) ([]*models.ConfigFileModel, error) {
	sqlText := `select * from config_files offset :offset limit :limit;`

	sqlParams := map[string]interface{}{"offset": offset, "limit": limit}
	var sqlResults []*models.ConfigFileModel

	rows, err := datastore.NamedQuery(sqlText, sqlParams)
	if err != nil {
		return nil, fmt.Errorf("SelectConfigFiles: %w", err)
	}
	if err = sqlx.StructScan(rows, &sqlResults); err != nil {
		return nil, fmt.Errorf("SelectConfigFiles: %w", err)
	}

	return sqlResults, nil
}
