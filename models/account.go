package models

import (
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"time"

	"github.com/pnnh/quantum-go/server/helpers"
	"github.com/pnnh/quantum-go/services/datastore"

	"github.com/go-webauthn/webauthn/webauthn"
	"github.com/jmoiron/sqlx"
)

type AccountModel struct {
	Pk          string         `json:"pk"`       // 主键标识
	Account     string         `json:"account"`  // 账号
	Password    string         `json:"password"` // 密码
	Photo       sql.NullString `json:"photo"`    // 密码
	CreateAt    time.Time      `json:"createat"`
	UpdateAt    time.Time      `json:"updateat"`
	Nickname    string         `json:"nickname"`
	Mail        sql.NullString `json:"mail"`
	Credentials sql.NullString `json:"credentials"`
	Session     sql.NullString `json:"session"`
	Description sql.NullString `json:"description"`
	Status      int            `json:"status"`
}

func NewAccountModel(name string, displayName string) *AccountModel {
	user := &AccountModel{
		Pk:       helpers.NewPostId(),
		Account:  name,
		CreateAt: time.Now(),
		UpdateAt: time.Now(),
		Nickname: displayName,
	}

	return user
}

func GetAccount(pk string) (*AccountModel, error) {
	sqlText := `select * from accounts where pk = :pk and status = 1;`

	sqlParams := map[string]interface{}{"pk": pk}
	var sqlResults []*AccountModel

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

func GetAccountByUsername(username string) (*AccountModel, error) {
	sqlText := `select pk, account, mail, nickname, credentials, session
	from accounts where account = :account and status = 1;`

	sqlParams := map[string]interface{}{"account": username}
	var sqlResults []*AccountModel

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

func PutAccount(model *AccountModel) error {
	sqlText := `insert into accounts(pk, createat, updateat, account, password, nickname, status, session)
	values(:pk, :createat, :updateat, :account, :password, :nickname, 1, :session)`

	sqlParams := map[string]interface{}{"pk": model.Pk, "createat": model.CreateAt, "updateat": model.UpdateAt,
		"account": model.Account, "password": "", "nickname": model.Nickname,
		"session": model.Session.String}

	_, err := datastore.NamedExec(sqlText, sqlParams)
	if err != nil {
		return fmt.Errorf("PutAccount: %w", err)
	}
	return nil
}

func UpdateAccountSession(model *AccountModel, sessionData *webauthn.SessionData) error {
	sessionBytes, err := json.Marshal(sessionData)
	if err != nil {
		return fmt.Errorf("序列化sessionData出错: %s", err)
	}
	sessionText := base64.StdEncoding.EncodeToString(sessionBytes)
	model.Session = sql.NullString{String: sessionText, Valid: true}

	if (model.Session == sql.NullString{} || !model.Session.Valid) {
		return fmt.Errorf("session is null")
	}
	sqlText := `update accounts set session = :session where pk = :pk;`

	sqlParams := map[string]interface{}{"pk": model.Pk, "session": model.Session.String}

	_, err = datastore.NamedExec(sqlText, sqlParams)
	if err != nil {
		return fmt.Errorf("UpdateAccountSession: %w", err)
	}
	return nil
}

func UnmarshalWebauthnSession(session string) (*webauthn.SessionData, error) {
	sessionBytes, err := base64.StdEncoding.DecodeString(session)
	if err != nil {
		return nil, fmt.Errorf("反序列化session出错: %s", err)
	}
	sessionData := &webauthn.SessionData{}
	if err := json.Unmarshal(sessionBytes, sessionData); err != nil {
		return nil, fmt.Errorf("反序列化sessionData出错: %s", err)
	}
	return sessionData, nil
}

func UpdateAccountPassword(pk string, password string) error {
	sqlText := `update accounts set password = :password where pk = :pk;`

	sqlParams := map[string]interface{}{"pk": pk, "password": password}

	_, err := datastore.NamedExec(sqlText, sqlParams)
	if err != nil {
		return fmt.Errorf("UpdateAccountPassword: %w", err)
	}
	return nil
}
