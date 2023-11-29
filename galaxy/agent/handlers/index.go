package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type indexHandler struct {
}

func (s *indexHandler) Query(gctx *gin.Context) {
	gctx.JSON(http.StatusOK, gin.H{"message": "galaxy-agent"})
}

func NewIndexHandler() *indexHandler {
	return &indexHandler{}
}
