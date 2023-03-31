package models

import (
	"github.com/pnnh/quantum-go/services/datastore"
)

type RoleSchema struct {
	//*RoleModel
	//datastore.Table[RoleSchema, RoleModel]
	Pk          datastore.ModelCondition
	Name        datastore.ModelCondition
	CreateTime  datastore.ModelCondition
	UpdateTime  datastore.ModelCondition
	Description datastore.ModelCondition
}

func NewRoleTable() RoleSchema {
	where := RoleSchema{
		//Table:       table,
		Pk:          datastore.NewCondition("Pk", "string", "pk", "varchar"),
		Name:        datastore.NewCondition("Name", "string", "name", "varchar"),
		CreateTime:  datastore.NewCondition("CreateTime", "time", "create_time", "varchar"),
		UpdateTime:  datastore.NewCondition("UpdateTime", "time", "update_time", "varchar"),
		Description: datastore.NewCondition("Description", "string", "description", "varchar"),
	}
	return where
}

func (r RoleSchema) GetConditions() []datastore.ModelCondition {
	return []datastore.ModelCondition{r.Pk, r.Name, r.CreateTime, r.UpdateTime, r.Description}
}

var RolesTable = datastore.NewTable[RoleSchema, RoleModel]("roles",
	NewRoleTable())
