package permissions

import (
	"github.com/gin-gonic/gin"
	"github.com/pnnh/multiverse-cloud-server/helpers"
	"github.com/pnnh/multiverse-cloud-server/models"
	"github.com/sirupsen/logrus"
	"net/http"
)

func PermissionSelectHandler(gctx *gin.Context) {
	offset := gctx.PostForm("offset")
	limit := gctx.PostForm("limit")
	logrus.Debugln("offset", offset, "limit", limit)

	accounts, err := helpers.PermissionsTable.Select(0, 10)
	if err != nil {
		gctx.JSON(http.StatusOK, models.CodeError.WithError(err))
		return
	}
	count, err := helpers.PermissionsTable.Count()
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
