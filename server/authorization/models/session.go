package models

import (
	"fmt"
	"time"

	"github.com/jmoiron/sqlx"
	"github.com/pnnh/quantum-go/services/datastore"
)

type SessionModel struct {
	Pk           string    `json:"pk"`
	Content      string    `json:"content"`
	CreateTime   time.Time `json:"create_time" db:"create_time"`
	UpdateTime   time.Time `json:"update_time" db:"update_time"`
	User         string    `json:"user"`
	Type         string    `json:"type"`
	Code         string    `json:"code"`
	ClientId     string    `json:"client_id" db:"client_id"`
	ResponseType string    `json:"response_type" db:"response_type"`
	RedirectUri  string    `json:"redirect_uri" db:"redirect_uri"`
	Scope        string    `json:"scope"`
	State        string    `json:"state"`
	Nonce        string    `json:"nonce"`
	IdToken      string    `json:"id_token" db:"id_token"`
	JwtId        string    `json:"jwt_id" db:"jwt_id"`
	AccessToken  string    `json:"access_token" db:"access_token"`
	OpenId       string    `json:"open_id" db:"open_id"`
	CompanyId    string    `json:"company_id" db:"company_id"`
}

func PutSession(model *SessionModel) error {
	sqlText := `insert into sessions(pk, content, create_time, update_time, "user", type, code,
		client_id, response_type, redirect_uri, scope, state, nonce, id_token, jwt_id, access_token, open_id, company_id) 
	values(:pk, :content, :create_time, :update_time, :user, :type, :code, '', '', '', '', '', '', '', '', '', '', '')`

	sqlParams := map[string]interface{}{"pk": model.Pk, "content": model.Content, "create_time": model.CreateTime,
		"update_time": model.UpdateTime, "user": model.User, "type": model.Type,
		"code": model.Code}

	_, err := datastore.NamedExec(sqlText, sqlParams)
	if err != nil {
		return fmt.Errorf("PutSession: %w", err)
	}
	return nil
}

func GetSession(pk string) (*SessionModel, error) {
	sqlText := `select * from sessions where pk = :pk;`

	sqlParams := map[string]interface{}{"pk": pk}
	var sqlResults []*SessionModel

	rows, err := datastore.NamedQuery(sqlText, sqlParams)
	if err != nil {
		return nil, fmt.Errorf("NamedQuery: %w", err)
	}
	if err = sqlx.StructScan(rows, &sqlResults); err != nil {
		return nil, fmt.Errorf("StructScan: %w", err)
	}

	for _, v := range sqlResults {
		return v, nil
	}

	return nil, nil
}

func FindSessionByJwtId(clientId, username, jwtId string) (*SessionModel, error) {

	sqlText := `select * from sessions where client_id = :client_id and user = :user and jwt_id = :jwt_id;`

	sqlParams := map[string]interface{}{
		"client_id": clientId,
		"user":      username,
		"jwt_id":    jwtId,
	}
	var sqlResults []*SessionModel

	rows, err := datastore.NamedQuery(sqlText, sqlParams)
	if err != nil {
		return nil, fmt.Errorf("NamedQuery: %w", err)
	}
	if err = sqlx.StructScan(rows, &sqlResults); err != nil {
		return nil, fmt.Errorf("StructScan: %w", err)
	}

	for _, v := range sqlResults {
		return v, nil
	}

	return nil, nil

}

func FindSessionByAccessToken(clientId, accessToken string) (*SessionModel, error) {
	sqlText := `select * from sessions where client_id = :client_id and access_token = :access_token;`

	sqlParams := map[string]interface{}{
		"client_id":    clientId,
		"access_token": accessToken,
	}
	var sqlResults []*SessionModel

	rows, err := datastore.NamedQuery(sqlText, sqlParams)
	if err != nil {
		return nil, fmt.Errorf("NamedQuery: %w", err)
	}
	if err = sqlx.StructScan(rows, &sqlResults); err != nil {
		return nil, fmt.Errorf("StructScan: %w", err)
	}

	for _, v := range sqlResults {
		return v, nil
	}

	return nil, nil

}

func FindSessionByCode(clientId, code string) (*SessionModel, error) {
	sqlText := `select * from sessions where client_id = :client_id and code = :code;`

	sqlParams := map[string]interface{}{
		"client_id": clientId,
		"code":      code,
	}
	var sqlResults []*SessionModel

	rows, err := datastore.NamedQuery(sqlText, sqlParams)
	if err != nil {
		return nil, fmt.Errorf("NamedQuery: %w", err)
	}
	if err = sqlx.StructScan(rows, &sqlResults); err != nil {
		return nil, fmt.Errorf("StructScan: %w", err)
	}

	for _, v := range sqlResults {
		return v, nil
	}

	return nil, nil

}

func UpdateSessionToken(id string, accessToken, idToken, jwtId string) error {
	sqlText := `update sessions set id_token=:id_token, access_token=:access_token, jwt_id=:jwt_id, 
		update_time=:update_time
	where pk = :pk;`

	sqlParams := map[string]interface{}{
		"update_time":  time.Now(),
		"access_token": accessToken,
		"jwt_id":       jwtId,
		"pk":           id,
		"id_token":     idToken,
	}

	_, err := datastore.NamedExec(sqlText, sqlParams)
	if err != nil {
		return fmt.Errorf("UpdateAccountPassword: %w", err)
	}
	return nil

}
