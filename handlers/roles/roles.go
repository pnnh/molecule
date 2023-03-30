package roles

import (
	"github.com/gin-gonic/gin"
	"github.com/pnnh/multiverse-cloud-server/helpers"
	"github.com/pnnh/multiverse-cloud-server/models"
	"github.com/sirupsen/logrus"
	"net/http"
)

func RoleGetHandler(ctx *gin.Context) {
	pk := ctx.Query("pk")
	name := ctx.Query("name")
	if pk == "" && name == "" {
		ctx.JSON(http.StatusOK, models.CodeInvalidParams)
		return
	}
	var model *models.RoleModel
	var err error
	if pk != "" {
		model, err = helpers.RolesTable.Get(pk)
	} else {
		model, err = helpers.RolesTable.GetWhere(func(m models.RoleTable) {
			m.Name.Eq(name)
		})
	}
	if err != nil {
		ctx.JSON(http.StatusOK, models.CodeError.WithError(err))
		return
	}

	result := models.CodeOk.WithData(model)

	ctx.JSON(http.StatusOK, result)
}

func RoleSelectHandler(gctx *gin.Context) {
	offset := gctx.PostForm("offset")
	limit := gctx.PostForm("limit")
	logrus.Debugln("offset", offset, "limit", limit)

	accounts, err := helpers.RolesTable.Select(0, 10)
	if err != nil {
		gctx.JSON(http.StatusOK, models.CodeError.WithError(err))
		return
	}
	count, err := helpers.RolesTable.Count()
	if err != nil {
		gctx.JSON(http.StatusOK, models.CodeError.WithError(err))
		return
	}
	sessionData := map[string]interface{}{
		"list":  accounts,
		"count": count,
	}

	result := models.CodeOk.WithData(sessionData)

	gctx.JSON(http.StatusOK, result)
}
