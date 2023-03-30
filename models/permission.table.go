package models

import (
	"github.com/pnnh/quantum-go/services/datastore"
)

type PermissionTable struct {
	*PermissionModel
	*datastore.Table[PermissionTable, PermissionModel]
	Pk          *datastore.ModelCondition[PermissionTable, PermissionModel]
	Name        *datastore.ModelCondition[PermissionTable, PermissionModel]
	CreateTime  *datastore.ModelCondition[PermissionTable, PermissionModel]
	UpdateTime  *datastore.ModelCondition[PermissionTable, PermissionModel]
	Description *datastore.ModelCondition[PermissionTable, PermissionModel]
}

func NewPermissionTable() *PermissionTable {
	table := datastore.NewTable[PermissionTable, PermissionModel]("permissions")
	where := PermissionTable{
		Table:       table,
		Pk:          table.NewCondition("Pk", "string", "pk", "varchar"),
		Name:        table.NewCondition("Name", "string", "name", "varchar"),
		CreateTime:  table.NewCondition("CreateTime", "time", "create_time", "varchar"),
		UpdateTime:  table.NewCondition("UpdateTime", "time", "update_time", "varchar"),
		Description: table.NewCondition("Description", "string", "description", "varchar"),
	}
	table.SetTable(where)
	return &where
}
