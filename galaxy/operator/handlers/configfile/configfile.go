package configfile

import (
	"galaxy-operator/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func FindConfigFile(gctx *gin.Context) {
	name := gctx.Query("name")
	if name == "" {
		gctx.JSON(http.StatusBadRequest, gin.H{"message": "name is required"})
		return
	}
	model, err := services.FindConfigFile(name)
	if err != nil {
		gctx.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	if model == nil {
		gctx.JSON(http.StatusNotFound, gin.H{"message": "not found"})
		return
	}
	gctx.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data":    model,
	})
}

func SelectConfigFiles(gctx *gin.Context) {
	model, err := services.SelectConfigFiles(0, 100)
	if err != nil {
		gctx.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	if model == nil {
		gctx.JSON(http.StatusNotFound, gin.H{"message": "not found"})
		return
	}
	gctx.JSON(http.StatusOK, gin.H{
		"count": len(model),
		"range": model,
	})
}
