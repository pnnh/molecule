package models

import (
	"database/sql"
	"time"
	"crypto/rand"
	"encoding/binary"

	"github.com/duo-labs/webauthn/protocol"
	"github.com/duo-labs/webauthn/webauthn"
) 

type AccountTable struct {
	Pk          string         `json:"pk" gorm:"primaryKey"`      // 主键标识
	UName       string         `json:"uname" gorm:"column:uname"` // 账号
	UPass       string         `json:"upass" gorm:"column:upass"` // 密码
	CreateTime  time.Time      `json:"create_time" gorm:"column:create_time"`
	UpdateTime  time.Time      `json:"update_time" gorm:"column:update_time"`
	Image       string         `json:"image" gorm:"column:image"`
	NickName    string         `json:"nickname" gorm:"column:nickname"`       // 昵称
	Photo       sql.NullString `json:"photo" gorm:"column:photo"`             // 照片
	Description sql.NullString `json:"description" gorm:"column:description"` // 个人描述
}

func (AccountTable) TableName() string {
	return "accounts"
}

// UserModel represents the user model
type UserModel struct {
	Id          uint64
	Name        string
	DisplayName string
	credentials []webauthn.Credential
}

// NewUser creates and returns a new User
func NewUser(name string, displayName string) *UserModel {

	user := &UserModel{}
	user.Id = randomUint64()
	user.Name = name
	user.DisplayName = displayName
	// user.credentials = []webauthn.Credential{}

	return user
}

func randomUint64() uint64 {
	buf := make([]byte, 8)
	rand.Read(buf)
	return binary.LittleEndian.Uint64(buf)
}

// WebAuthnID returns the user's ID
func (u UserModel) WebAuthnID() []byte {
	buf := make([]byte, binary.MaxVarintLen64)
	binary.PutUvarint(buf, uint64(u.Id))
	return buf
}

// WebAuthnName returns the user's username
func (u UserModel) WebAuthnName() string {
	return u.Name
}

// WebAuthnDisplayName returns the user's display name
func (u UserModel) WebAuthnDisplayName() string {
	return u.DisplayName
}

// WebAuthnIcon is not (yet) implemented
func (u UserModel) WebAuthnIcon() string {
	return ""
}

// AddCredential associates the credential to the user
func (u *UserModel) AddCredential(cred webauthn.Credential) {
	u.credentials = append(u.credentials, cred)
}

// WebAuthnCredentials returns credentials owned by the user
func (u UserModel) WebAuthnCredentials() []webauthn.Credential {
	return u.credentials
}

// CredentialExcludeList returns a CredentialDescriptor array filled
// with all the user's credentials
func (u UserModel) CredentialExcludeList() []protocol.CredentialDescriptor {

	credentialExcludeList := []protocol.CredentialDescriptor{}
	for _, cred := range u.credentials {
		descriptor := protocol.CredentialDescriptor{
			Type:         protocol.PublicKeyCredentialType,
			CredentialID: cred.ID,
		}
		credentialExcludeList = append(credentialExcludeList, descriptor)
	}

	return credentialExcludeList
}
