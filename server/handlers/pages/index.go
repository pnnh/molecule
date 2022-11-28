package pages

import (
	"errors"
	"fmt"
	"html/template"
	"net/http"
	"quantum/models"
	"quantum/server/middleware"
	"quantum/server/utils"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

const IndexPageSize = 10

type indexHandler struct {
	md *middleware.ServerMiddleware
}

func (s *indexHandler) Query(gctx *gin.Context) {
	if pwa, ok := gctx.GetQuery("pwa"); ok && pwa == "1" {
		utils.ServePWA(gctx)
		return
	}

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
	auth, err := middleware.GetAuth(gctx)
	if err != nil {
		utils.ResponseServerError(gctx, "获取用户信息出错", err)
		return
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
	pagesHtml := calcPagesHtml(maxPage, currentPage)

	gctx.HTML(http.StatusOK, "index/index.mst", gin.H{
		"list":      list,
		"count":     listCount,
		"pagesHtml": pagesHtml,
		"data": gin.H{
			"login": len(auth) > 0,
		},
	})
}

func calcPagesHtml(maxPage int, currentPage int) template.HTML {
	startPage := currentPage - 5
	endPage := currentPage + 5

	if startPage < 1 {
		startPage = 1
	}
	if endPage > maxPage {
		endPage = maxPage
	}
	pagesBuilder := strings.Builder{}
	prevPage := currentPage - 1
	nextPage := currentPage + 1

	if prevPage >= 1 {
		prevPageHtml := fmt.Sprintf(`<a class="page" href="/?p=%d">«</a>`, prevPage)
		pagesBuilder.WriteString(prevPageHtml)
	}
	for i := startPage; i <= endPage; i++ {
		classActive := ""
		if i == currentPage {
			classActive = "active"
		}
		page := fmt.Sprintf(`<a class="page %s" href="/?p=%d">%d</a>`, classActive, i, i)
		pagesBuilder.WriteString(page)
	}
	if nextPage <= maxPage {
		nextPageHtml := fmt.Sprintf(`<a class="page" href="/?p=%d">»</a>`, nextPage)
		pagesBuilder.WriteString(nextPageHtml)
	}

	pagesHtml := pagesBuilder.String()

	return template.HTML(pagesHtml)
}

func NewIndexHandler(md *middleware.ServerMiddleware) *indexHandler {
	return &indexHandler{
		md: md,
	}
}

func ClientPage(gctx *gin.Context) {
	utils.ClientPage(gctx, http.StatusOK, nil)
}
