package models

import (
	"github.com/pnnh/quantum-go/services/datastore"
)

type RoleTable struct {
	*RoleModel
	*datastore.Table[RoleTable, RoleModel]
	Pk          *datastore.ModelCondition[RoleTable, RoleModel]
	Name        *datastore.ModelCondition[RoleTable, RoleModel]
	CreateTime  *datastore.ModelCondition[RoleTable, RoleModel]
	UpdateTime  *datastore.ModelCondition[RoleTable, RoleModel]
	Description *datastore.ModelCondition[RoleTable, RoleModel]
}

func NewRoleTable() *RoleTable {
	table := datastore.NewTable[RoleTable, RoleModel]("roles")
	where := RoleTable{
		Table:       table,
		Pk:          table.NewCondition("Pk", "string", "pk", "varchar"),
		Name:        table.NewCondition("Name", "string", "name", "varchar"),
		CreateTime:  table.NewCondition("CreateTime", "time.Time", "create_time", "timestamp"),
		UpdateTime:  table.NewCondition("UpdateTime", "time.Time", "update_time", "timestamp"),
		Description: table.NewCondition("Description", "string", "description", "varchar"),
	}
	table.SetTable(where)
	return &where
}
