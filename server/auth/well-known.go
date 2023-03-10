package auth

import "github.com/gin-gonic/gin"

func OpenIdConfigurationHandler(gctx *gin.Context) {

	responseText := `
	{
		"issuer": "https://debug.multiverse.direct",
		"authorization_endpoint": "https://debug.multiverse.direct/server/oauth2/auth",
		"device_authorization_endpoint": "https://debug.multiverse.direct/server/device/code",
		"token_endpoint": "https://debug.multiverse.direct/server/oauth2/token",
		"userinfo_endpoint": "https://debug.multiverse.direct/server/resources/userinfo",
		"revocation_endpoint": "https://debug.multiverse.direct/server/oauth2/revoke",
		"introspection_endpoint": "https://debug.multiverse.direct/server/oauth2/introspect",
		"jwks_uri": "https://debug.multiverse.direct/server/oauth2/certs",
		"response_types_supported": [
			"code",
			"token",
			"id_token",
			"code token",
			"code id_token",
			"token id_token",
			"code token id_token",
			"none"
		],
		"subject_types_supported": [
			"public"
		],
		"id_token_signing_alg_values_supported": [
			"RS256"
		],
		"scopes_supported": [
			"openid",
			"email",
			"profile"
		],
		"token_endpoint_auth_methods_supported": [
			"client_secret_post",
			"client_secret_basic"
		],
		"claims_supported": [
			"aud",
			"email",
			"email_verified",
			"exp",
			"family_name",
			"given_name",
			"iat",
			"iss",
			"locale",
			"name",
			"picture",
			"sub"
		],
		"code_challenge_methods_supported": [
			"plain",
			"S256"
		],
		"grant_types_supported": [
			"authorization_code",
			"refresh_token",
			"urn:ietf:params:oauth:grant-type:device_code",
			"urn:ietf:params:oauth:grant-type:jwt-bearer"
		]
	}
	`
	gctx.Data(200, "application/json", []byte(responseText))
}
