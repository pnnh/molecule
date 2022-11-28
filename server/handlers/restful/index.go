package restful

import (
	"errors"
	"net/http"
	"quantum/models"
	"quantum/server/middleware"
	"quantum/server/utils"
	"strconv"

	"github.com/gin-gonic/gin"
)

const IndexPageSize = 10

type indexRestfulHandler struct {
	md *middleware.ServerMiddleware
}

func (s *indexRestfulHandler) Query(gctx *gin.Context) {
	pageString, ok := gctx.GetQuery("p")
	currentPage := 1
	if ok {
		if v, err := strconv.Atoi(pageString); err != nil || v <= 0 {
			utils.ResponseError(gctx, http.StatusInternalServerError, errors.New("参数有误"))
			return
		} else {
			currentPage = v
		}
	}
	sqlCountText := `select count(*) from articles where status = 1;`
	var listCount int
	if err := s.md.SqlxService.QueryRow(sqlCountText).Scan(&listCount); err != nil {
		utils.ResponseServerError(gctx, "查询文章总数出错", err)
		return
	}
	maxPage := listCount / IndexPageSize
	if listCount%IndexPageSize != 0 {
		maxPage += 1
	}
	if currentPage > maxPage {
		currentPage = maxPage
	}
	sqlText := `select articles.*, accounts.nickname, articles_views.views
from articles 
    left join accounts on articles.creator = accounts.pk
	left join articles_views on articles.pk = articles_views.pk
where status = 1
order by update_time desc offset $1 limit $2;`
	var sqlResults []*models.ArticleModel

	offset, limit := (currentPage-1)*IndexPageSize, IndexPageSize
	if err := s.md.SqlxService.Select(&sqlResults, sqlText, offset, limit); err != nil {
		utils.ResponseServerError(gctx, "查询文章列表出错", err)
		return
	}
	list := make([]*models.ArticleJsonView, len(sqlResults))
	for k, v := range sqlResults {
		list[k] = v.ToJsonView()
	}

	gctx.JSON(http.StatusOK, gin.H{
		"list":  list,
		"count": listCount,
	})
}

func NewIndexRestfulHandler(md *middleware.ServerMiddleware) *indexRestfulHandler {
	return &indexRestfulHandler{
		md: md,
	}
}
