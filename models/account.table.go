package models

import (
	"github.com/pnnh/quantum-go/services/datastore"
)

type AccountTable struct {
	*AccountModel
	*datastore.Table[AccountTable, AccountModel]
	Pk          *datastore.ModelCondition[AccountTable, AccountModel]
	Username    *datastore.ModelCondition[AccountTable, AccountModel]
	Password    *datastore.ModelCondition[AccountTable, AccountModel]
	Photo       *datastore.ModelCondition[AccountTable, AccountModel]
	CreateTime  *datastore.ModelCondition[AccountTable, AccountModel]
	UpdateTime  *datastore.ModelCondition[AccountTable, AccountModel]
	Nickname    *datastore.ModelCondition[AccountTable, AccountModel]
	Mail        *datastore.ModelCondition[AccountTable, AccountModel]
	Credentials *datastore.ModelCondition[AccountTable, AccountModel]
	Session     *datastore.ModelCondition[AccountTable, AccountModel]
	Description *datastore.ModelCondition[AccountTable, AccountModel]
	Status      *datastore.ModelCondition[AccountTable, AccountModel]
}

func NewAccountTable() *AccountTable {
	table := datastore.NewTable[AccountTable, AccountModel]("accounts")
	where := AccountTable{
		Table:       table,
		Pk:          table.NewCondition("Pk", "string", "pk", "varchar"),
		Username:    table.NewCondition("Username", "string", "username", "varchar"),
		Password:    table.NewCondition("Password", "string", "password", "varchar"),
		Photo:       table.NewCondition("Photo", "string", "photo", "varchar"),
		CreateTime:  table.NewCondition("CreateTime", "time", "create_time", "varchar"),
		UpdateTime:  table.NewCondition("UpdateTime", "time", "update_time", "varchar"),
		Nickname:    table.NewCondition("Nickname", "string", "nickname", "varchar"),
		Mail:        table.NewCondition("Mail", "string", "mail", "varchar"),
		Credentials: table.NewCondition("Credentials", "string", "credentials", "varchar"),
		Session:     table.NewCondition("Session", "string", "session", "varchar"),
		Description: table.NewCondition("Description", "string", "description", "varchar"),
		Status:      table.NewCondition("Status", "int", "status", "int"),
	}
	table.SetTable(where)
	return &where
}
