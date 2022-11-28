package pages

import (
	"net/http"
	"quantum/server/middleware"
	"quantum/server/utils"

	"github.com/gin-gonic/gin"
)

const IndexPageSize = 10

type indexHandler struct {
	md *middleware.ServerMiddleware
}

func (s *indexHandler) Query(gctx *gin.Context) {
	
	gctx.HTML(http.StatusOK, "index/index.mst", gin.H{})
}
 
func NewIndexHandler(md *middleware.ServerMiddleware) *indexHandler {
	return &indexHandler{
		md: md,
	}
}

func ClientPage(gctx *gin.Context) {
	utils.ClientPage(gctx, http.StatusOK, nil)
}
