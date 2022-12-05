package sqlxsvc

import (
	"database/sql"
	"quantum/config"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"github.com/sirupsen/logrus"
)

var (
	sqlxdb *sqlx.DB
)

func init() {
	db, err := sqlx.Connect("postgres", config.ACCOUNT_DB_DSN)
	if err != nil {
		logrus.Fatalln("sqlxsvc init fail", err)
	}
	sqlxdb = db
}

func NamedQuery(query string, arg interface{}) (*sqlx.Rows, error) {
	return sqlxdb.NamedQuery(query, arg)
}

func NamedExec(query string, arg interface{}) (sql.Result, error) {
	return sqlxdb.NamedExec(query, arg)
}
 