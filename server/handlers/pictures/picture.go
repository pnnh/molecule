package pictures

import (
	"database/sql"
	"fmt"
	"net/http"

	"quantum/server/middleware"
	"quantum/server/utils"

	"quantum/models"

	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
	"github.com/sirupsen/logrus"
)

const EmotionPageSize = 8

type pictureHandler struct {
	serverMiddleware *middleware.ServerMiddleware
}

type pictureQuerySqlResult struct {
	models.PictureSqlResult
	NickName sql.NullString `json:"nickname"`
}

type pictureQueryPostBody struct {
	Page  int    `json:"page"`
	Group string `json:"group"`
	Query string `json:"query"`
}

func (s *pictureHandler) Query(gctx *gin.Context) {
	postBody := &pictureQueryPostBody{}
	if err := gctx.ShouldBindJSON(postBody); err != nil {
		utils.ResponseError(gctx, http.StatusInternalServerError, err)
		return
	}
	currentPage := postBody.Page
	groupString := postBody.Group

	sqlCountText := `select count(*) from pictures;`
	var listCount int
	if err := s.serverMiddleware.SqlxService.QueryRow(sqlCountText).Scan(&listCount); err != nil {
		logrus.Errorln(fmt.Errorf("查询表情总数出错: %w", err))
		gctx.Status(http.StatusInternalServerError)
		return
	}
	maxPage := listCount / EmotionPageSize
	if listCount%EmotionPageSize != 0 {
		maxPage += 1
	}
	if currentPage > maxPage {
		currentPage = maxPage
	}
	offset, limit := (currentPage-1)*EmotionPageSize, EmotionPageSize
	if offset < 0 {
		offset = 0
	}
	sqlText := `select p.pk, p.title, p.update_time, p.description, p.uri, pf.file
	from pictures p left join pictures_files pf on p.pk = pf.pk
	where p.status = 1 `
	sqlParams := map[string]interface{}{"offset": offset, "limit": limit}
	if len(groupString) > 0 && groupString != "0" {
		sqlText += ` and p.group_key = :group_key`
		sqlParams["group_key"] = groupString
	}
	if len(postBody.Query) > 0 {
		sqlText += ` and p.title like :query`
		sqlParams["query"] = fmt.Sprintf("%%%s%%", postBody.Query)
	}
	sqlText += ` order by p.update_time desc offset :offset limit :limit;`
	var sqlResults []pictureQuerySqlResult

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

	pictures := make([]*models.PictureJsonView, 0)
	for _, v := range sqlResults {
		vm := &models.PictureJsonView{
			Pk:    v.Pk,
			Title: v.Title,
			File:  v.File.String,
		}
		pictures = append(pictures, vm)
	}

	gctx.JSON(http.StatusOK, gin.H{
		"list":  pictures,
		"count": listCount,
	})
}

func NewEmotionHandler(md *middleware.ServerMiddleware) *pictureHandler {
	return &pictureHandler{
		serverMiddleware: md,
	}
}
