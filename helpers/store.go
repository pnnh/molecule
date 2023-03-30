package helpers

import (
	"github.com/pnnh/multiverse-cloud-server/models"
)

var RolesTable = models.NewRoleTable()             //datastore.NewTable("roles", &models.RoleModel{})
var PermissionsTable = models.NewPermissionTable() // datastore.NewTable("permissions")
var AccountsTable = models.NewAccountTable()       // datastore.NewTable("accounts")
