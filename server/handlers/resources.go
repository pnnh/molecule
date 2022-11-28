package handlers

import (
	"fmt"
	"net/http"
	"strings"

	"quantum/server/middleware"
	"quantum/server/utils"

	"quantum/models"

	"github.com/gin-gonic/gin"

	"github.com/jmoiron/sqlx"
	"github.com/sirupsen/logrus"
)

const ResourcesPageSize = 8

type resourcesHandler struct {
	serverMiddleware *middleware.ServerMiddleware
}

type resourcesQueryPostBody struct {
	Page  int    `json:"page"`
	Group string `json:"group"`
	Query string `json:"query"`
}

func (s *resourcesHandler) Query(gctx *gin.Context) {
	postBody := &resourcesQueryPostBody{}
	if err := gctx.ShouldBind(postBody); err != nil {
		utils.ResponseError(gctx, http.StatusInternalServerError, err)
		return
	}
	currentPage := postBody.Page
	groupString := postBody.Group

	sqlCountText := `select count(*) from resources where status = 1;`
	var listCount int
	if err := s.serverMiddleware.SqlxService.QueryRow(sqlCountText).Scan(&listCount); err != nil {
		logrus.Errorln(fmt.Errorf("查询表情总数出错: %w", err))
		gctx.Status(http.StatusInternalServerError)
		return
	}
	maxPage := listCount / ResourcesPageSize
	if listCount%ResourcesPageSize != 0 {
		maxPage += 1
	}
	if currentPage > maxPage {
		currentPage = maxPage
	}
	offset, limit := (currentPage-1)*ResourcesPageSize, ResourcesPageSize
	if offset < 0 {
		offset = 0
	}
	sqlText := `select p.pk, p.title, p.updateat, p.description, p.header, p.body, p.creator, p.owner, p.path,
		p.tags, p.version, p.status, p.extend, p.cover
	from resources p
	where p.status = 1`
	sqlParams := map[string]interface{}{"offset": offset, "limit": limit}
	if len(groupString) > 0 && groupString != "0" {
		sqlText += ` and p.group_pk = :group_pk`
		sqlParams["group_pk"] = groupString
	}
	if len(postBody.Query) > 0 {
		sqlText += ` and p.title like :query`
		sqlParams["query"] = fmt.Sprintf("%%%s%%", postBody.Query)
	}
	sqlText += ` order by p.updateat desc offset :offset limit :limit;`
	var sqlResults []*models.ResourceModel

	rows, err := s.serverMiddleware.SqlxService.NamedQuery(sqlText, sqlParams)
	if err != nil {
		logrus.Errorln(fmt.Errorf("查询表情总数出错2: %w", err))
		gctx.Status(http.StatusInternalServerError)
		return
	}
	if err = sqlx.StructScan(rows, &sqlResults); err != nil {
		logrus.Errorln(fmt.Errorf("查询表情总数出错3: %w", err))
		gctx.Status(http.StatusInternalServerError)
		return
	}

	resources := make([]*models.ResourceJsonView, 0)
	for _, v := range sqlResults {
		vm := v.ToJsonView()
		resources = append(resources, vm)
	}

	gctx.JSON(http.StatusOK, gin.H{
		"list":  resources,
		"count": listCount,
	})
}

type resourcesFindInput struct {
	Pk string `json:"pk"`
}

func (s *resourcesHandler) Find(gctx *gin.Context) {
	postBody := &resourcesFindInput{}
	if err := gctx.ShouldBind(postBody); err != nil || len(strings.Trim(postBody.Pk, " ")) < 1 {
		utils.ResponseError(gctx, http.StatusInternalServerError, err)
		return
	}

	sqlText := `select p.pk, p.title, p.update_time, p.description, p.header, p.body
	from resources p
	where pk = :pk and p.status = 1 `
	sqlParams := map[string]interface{}{"pk": postBody.Pk}
	var sqlResults []*models.ResourceModel

	rows, err := s.serverMiddleware.SqlxService.NamedQuery(sqlText, sqlParams)
	if err != nil {
		logrus.Errorln(fmt.Errorf("查询表情总数出错2: %w", err))
		gctx.Status(http.StatusInternalServerError)
		return
	}
	if err = sqlx.StructScan(rows, &sqlResults); err != nil {
		logrus.Errorln(fmt.Errorf("查询表情总数出错3: %w", err))
		gctx.Status(http.StatusInternalServerError)
		return
	}

	for _, v := range sqlResults {
		vm := &models.ResourceJsonView{
			Pk:     v.Pk,
			Title:  v.Title,
			Body:   v.Body.String,
			Header: v.Header,
		}

		gctx.JSON(http.StatusOK, gin.H{
			"data": vm,
		})
		return
	}

	gctx.JSON(http.StatusOK, gin.H{})
}

func NewResourcesHandler(md *middleware.ServerMiddleware) *resourcesHandler {
	return &resourcesHandler{
		serverMiddleware: md,
	}
}
