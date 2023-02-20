package authorizationserver

import (
	"net/http"

	"github.com/sirupsen/logrus"
)

func TokenEndpoint(rw http.ResponseWriter, req *http.Request) {
	ctx := req.Context()

	mySessionData := newSession("")

	accessRequest, err := oauth2.NewAccessRequest(ctx, req, mySessionData)

	if err != nil {
		logrus.Printf("Error occurred in NewAccessRequest: %+v", err)
		oauth2.WriteAccessError(ctx, rw, accessRequest, err)
		return
	}

	if accessRequest.GetGrantTypes().ExactOne("client_credentials") {
		for _, scope := range accessRequest.GetRequestedScopes() {
			accessRequest.GrantScope(scope)
		}
	}

	response, err := oauth2.NewAccessResponse(ctx, accessRequest)
	if err != nil {
		logrus.Printf("Error occurred in NewAccessResponse: %+v", err)
		oauth2.WriteAccessError(ctx, rw, accessRequest, err)
		return
	}

	oauth2.WriteAccessResponse(ctx, rw, accessRequest, response)
}
