package models

import (
	"bytes"
	"container/list"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"html/template"
	"quantum/protocols"
	"quantum/services/db"
	"strings"
	"time"

	"github.com/jmoiron/sqlx"
	"github.com/yuin/goldmark"
)

// 对应数据库文章表
type ArticleTable struct {
	Pk          string         `json:"pk" gorm:"primaryKey"`
	Title       sql.NullString `json:"title"`
	Body        sql.NullString `json:"body"`
	CreateTime  time.Time      `json:"create_time" db:"create_time"`
	UpdateTime  time.Time      `json:"update_time" db:"update_time"`
	Creator     string         `json:"creator"`
	Keywords    sql.NullString `json:"keywords"`
	Description sql.NullString `json:"description"`
	MarkLang    int            `json:"mark_lang" db:"mark_lang"`
	Status      sql.NullInt32  `json:"status"`
	MarkText    sql.NullString `json:"mark_text" db:"mark_text"`
	Uri         sql.NullString `json:"uri"`
	Cover       sql.NullString `json:"cover"`
}

type ArticleModel struct {
	ArticleTable
	NickName sql.NullString `json:"nickname"`
	Views    sql.NullInt64  `json:"views"`
}

type ArticleJsonView struct {
	Pk           string   `json:"pk"`
	Title        string   `json:"title"`
	Body         string   `json:"body"`
	Creator      string   `json:"creator"`
	Description  string   `json:"description"`
	CreateTime   string   `json:"create_time"`
	UpdateTime   string   `json:"update_time"`
	NickName     string   `json:"nickname"`
	Views        int64    `json:"views"`
	Keywords     string   `json:"keywords"`
	KeywordsList []string `json:"keywords_list"`
	MarkLang     int      `json:"mark_lang" db:"mark_lang"`
	Status       int      `json:"status"`
	MarkText     string   `json:"mark_text" db:"mark_text"`
	Uri          string   `json:"uri"`
	Cover        string   `json:"cover"`
}

func (model *ArticleModel) ToJsonView() *ArticleJsonView {
	return &ArticleJsonView{
		Pk:           model.Pk,
		Title:        model.Title.String,
		CreateTime:   model.CreateTime.Format(time.RFC3339),
		UpdateTime:   model.UpdateTime.Format(time.RFC3339),
		KeywordsList: strings.Split(model.Keywords.String, ","),
		Status:       int(model.Status.Int32),
		Body:         model.Body.String,
		Creator:      model.Creator,
		Keywords:     model.Keywords.String,
		Description:  model.Description.String,
		NickName:     model.NickName.String,
		Views:        model.Views.Int64,
		MarkLang:     model.MarkLang,
		MarkText:     model.MarkText.String,
		Uri:          model.Uri.String,
		Cover:        model.Cover.String,
	}
}

func (model *ArticleModel) ToHtmlView() (map[string]interface{}, error) {
	bodyHtml := ""

	tocList := list.New()

	titleTocItem := &tocItem{
		title:  model.Title.String,
		header: 0,
	}
	tocList.PushBack(titleTocItem)

	if model.MarkLang == protocols.MarkLangMarkdown {
		var buf bytes.Buffer
		if err := goldmark.Convert([]byte(model.MarkText.String), &buf); err != nil {
			return nil, fmt.Errorf("Markdown转换Html出错: %w", err)
		}
		bodyHtml = buf.String()
	} else {
		value := make(map[string]interface{})
		if err := json.Unmarshal([]byte(model.Body.String), &value); err != nil {
			return nil, fmt.Errorf("文章Unmarshal出错: %w", err)
		}
		content, err := buildBody(tocList, value)
		if err != nil {
			return nil, fmt.Errorf("buildBody出错: %w", err)
		}
		bodyHtml = content
	}
	tocSlice := make([]*tocItem, tocList.Len())
	tocIndex := 0
	for temp := tocList.Front(); temp != nil; temp = temp.Next() {
		tocSlice[tocIndex] = temp.Value.(*tocItem)
		tocIndex += 1
	}

	htmlView := map[string]interface{}{
		"pk":          model.Pk,
		"title":       model.Title.String,
		"description": model.Description.String,
		"keywords":    model.Keywords.String,
		"keywordsList": strings.FieldsFunc(model.Keywords.String, func(c rune) bool {
			return c == ','
		}),
		"bodyHtml": template.HTML(bodyHtml),
		"tocSlice": tocSlice,
	}
	return htmlView, nil
}

func FindArticleModel(sqlxService *db.SqlxService, pk string) (*ArticleModel, error) {
	sqlText := `select p.pk, p.title, p.body, p.create_time, p.update_time, p.creator, p.keywords, p.description,
		p.mark_lang, p.status, p.mark_text, p.uri, p.cover
	from articles p
	where pk = :pk and p.status = 1`
	sqlParams := map[string]interface{}{"pk": pk}
	var sqlResults []*ArticleModel

	rows, err := sqlxService.NamedQuery(sqlText, sqlParams)
	if err != nil {
		return nil, fmt.Errorf("查询文章NamedQuery出错: %w", err)
	}
	if err = sqlx.StructScan(rows, &sqlResults); err != nil {
		return nil, fmt.Errorf("查询文章Scan出错: %w", err)
	}

	for _, v := range sqlResults {
		return v, nil
	}
	return nil, protocols.ErrNotFound
}

type tocItem struct {
	title  string
	header int
}

func buildBody(tocList *list.List, nodes map[string]interface{}) (string, error) {
	children, ok := nodes["children"].([]interface{})
	if !ok {
		return "", errors.New("缺少字段children")
	}

	builder := strings.Builder{}
	for k, v := range children {
		child, ok := v.(map[string]interface{})
		if !ok {
			return "", fmt.Errorf("类型错误: %d", k)
		}
		content, err := buildNode(tocList, child)
		if err != nil {
			return "", fmt.Errorf("buildNode出错: %w", err)
		}
		builder.WriteString(content)
	}
	return builder.String(), nil
}

func buildNode(tocList *list.List, node interface{}) (string, error) {
	value, ok := node.(map[string]interface{})
	if !ok {
		return "", fmt.Errorf("类型错误")
	}
	name := value["name"]
	switch name {
	case "paragraph":
		return buildParagraph(node)
	case "header":
		return buildHeader(tocList, node)
	case "code-block":
		return buildCodeBlock(node)
	}
	return "", nil
}

func buildParagraph(node interface{}) (string, error) {
	value, ok := node.(map[string]interface{})
	if !ok {
		return "", fmt.Errorf("类型错误")
	}
	children, ok := value["children"].([]interface{})
	if !ok {
		return "", errors.New("缺少字段children")
	}

	builder := strings.Builder{}
	builder.WriteString("<p>")
	for k, v := range children {
		text, err := buildText(v)
		if err != nil {
			return "", fmt.Errorf("buildText错误: %d", k)
		}
		builder.WriteString(text)
	}
	builder.WriteString("</p>")
	return builder.String(), nil
}

func buildCodeBlock(node interface{}) (string, error) {
	value, ok := node.(map[string]interface{})
	if !ok {
		return "", fmt.Errorf("类型错误")
	}
	children, ok := value["children"].([]interface{})
	if !ok {
		return "", errors.New("缺少字段children")
	}
	language, ok := value["language"].(string)
	if !ok {
		return "", errors.New("缺少字段language")
	}
	builder := strings.Builder{}
	builder.WriteString(fmt.Sprintf("<pre class='code' data-lang='%s'><code>", language))

	for k, v := range children {
		text, err := buildCode(v)
		if err != nil {
			return "", fmt.Errorf("buildText错误: %d", k)
		}
		builder.WriteString(text)
	}

	builder.WriteString("</code></pre>")

	return builder.String(), nil
}

func buildHeader(tocList *list.List, node interface{}) (string, error) {
	value, ok := node.(map[string]interface{})
	if !ok {
		return "", fmt.Errorf("类型错误")
	}
	header, ok := value["header"].(float64)
	if !ok {
		return "", fmt.Errorf("缺少字段header")
	}
	children, ok := value["children"].([]interface{})
	if !ok {
		return "", errors.New("缺少字段children")
	}
	builder := strings.Builder{}
	builder.WriteString(fmt.Sprintf("<h%.0f>", header))

	var headerTitle = ""
	for k, v := range children {
		text, err := buildText(v)
		if err != nil {
			return "", fmt.Errorf("buildText错误: %d", k)
		}
		headerTitle += text
		builder.WriteString(text)
	}
	tocItem := &tocItem{
		title:  headerTitle,
		header: int(header),
	}
	tocList.PushBack(tocItem)

	builder.WriteString(fmt.Sprintf("</h%.0f>", header))

	return builder.String(), nil
}

func buildText(node interface{}) (string, error) {
	value, ok := node.(map[string]interface{})
	if !ok {
		return "", fmt.Errorf("类型错误")
	}
	text, ok := value["text"].(string)
	if !ok {
		return "", fmt.Errorf("文本节点类型有误")
	}
	//return fmt.Sprintf("<span>%s</span>", text), nil
	return text, nil
}

func buildCode(node interface{}) (string, error) {
	value, ok := node.(map[string]interface{})
	if !ok {
		return "", fmt.Errorf("类型错误")
	}
	text, ok := value["text"].(string)
	if !ok {
		return "", fmt.Errorf("文本节点类型有误")
	}
	//return fmt.Sprintf("<span>%s</span>", text), nil
	return text, nil
}
