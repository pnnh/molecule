package main

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"

	"gintest/controller"
	_ "gintest/docs"
	"gintest/httputil"

	ginSwagger "github.com/swaggo/gin-swagger"
	swaggerFiles "github.com/swaggo/gin-swagger/swaggerFiles"
)

// @title Swagger 示例 API
// @version 1.0
// @description 模拟示例服务器

// @host localhost:8080
// @BasePath /api

// @securityDefinitions.basic BasicAuth

// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name Authorization

func main() {
	r := gin.Default()

	c := controller.NewController()

	api := r.Group("/api")
	{
		apiv2 := api.Group("/v2")
		{
			accounts := apiv2.Group("/accounts")
			{
				accounts.GET(":id", c.ShowAccount)
				accounts.GET("", c.ListAccounts)
				accounts.POST("", c.AddAccount)
				accounts.DELETE(":id", c.DeleteAccount)
				accounts.PATCH(":id", c.UpdateAccount)
				accounts.POST(":id/images", c.UploadAccountImage)
			}
		}
		//accounts := api.Group("/accounts")
		//{
		//	accounts.GET(":id", c.ShowAccount)
		//	accounts.GET("", c.ListAccounts)
		//	accounts.POST("", c.AddAccount)
		//	accounts.DELETE(":id", c.DeleteAccount)
		//	accounts.PATCH(":id", c.UpdateAccount)
		//	accounts.POST(":id/images", c.UploadAccountImage)
		//}
		bottles := api.Group("/bottles")
		{
			bottles.GET(":id", c.ShowBottle)
			bottles.GET("", c.ListBottles)
		}
		admin := api.Group("/admin")
		{
			admin.Use(auth())
			admin.POST("/auth", c.Auth)
		}
		examples := api.Group("/examples")
		{
			examples.GET("ping", c.PingExample)
			examples.GET("calc", c.CalcExample)
			examples.GET("groups/:group_id/accounts/:account_id", c.PathParamsExample)
			examples.GET("header", c.HeaderExample)
			examples.GET("securities", c.SecuritiesExample)
			examples.GET("attribute", c.AttributeExample)
		}
	}
	url := ginSwagger.URL("http://localhost:8080/swagger/doc.json") // The url pointing to API definition
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler, url))
	r.Run(":8080")
}

func auth() gin.HandlerFunc {
	return func(c *gin.Context) {
		if len(c.GetHeader("Authorization")) == 0 {
			httputil.NewError(c, http.StatusUnauthorized, errors.New("Authorization is required Header"))
			c.Abort()
		}
		c.Next()
	}
}
