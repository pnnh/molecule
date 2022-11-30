package authorizationserver

import (
	 "context"
	 "sync"
	 "time"
 
	 "gopkg.in/square/go-jose.v2"
 
	 "github.com/ory/fosite"
 )
 
 type DatabaseUserRelation struct {
	 Username string
	 Password string
 }
 
 type IssuerPublicKeys struct {
	 Issuer    string
	 KeysBySub map[string]SubjectPublicKeys
 }
 
 type SubjectPublicKeys struct {
	 Subject string
	 Keys    map[string]PublicKeyScopes
 }
 
 type PublicKeyScopes struct {
	 Key    *jose.JSONWebKey
	 Scopes []string
 }
 
 type DatabaseStore struct {
	 Clients         map[string]fosite.Client
	 AuthorizeCodes  map[string]StoreAuthorizeCode
	 IDSessions      map[string]fosite.Requester
	 AccessTokens    map[string]fosite.Requester
	 RefreshTokens   map[string]StoreRefreshToken
	 PKCES           map[string]fosite.Requester
	 Users           map[string]DatabaseUserRelation
	 BlacklistedJTIs map[string]time.Time
	 // In-memory request ID to token signatures
	 AccessTokenRequestIDs  map[string]string
	 RefreshTokenRequestIDs map[string]string
	 // Public keys to check signature in auth grant jwt assertion.
	 IssuerPublicKeys map[string]IssuerPublicKeys
 
	 clientsMutex                sync.RWMutex
	 authorizeCodesMutex         sync.RWMutex
	 idSessionsMutex             sync.RWMutex
	 accessTokensMutex           sync.RWMutex
	 refreshTokensMutex          sync.RWMutex
	 pkcesMutex                  sync.RWMutex
	 usersMutex                  sync.RWMutex
	 blacklistedJTIsMutex        sync.RWMutex
	 accessTokenRequestIDsMutex  sync.RWMutex
	 refreshTokenRequestIDsMutex sync.RWMutex
	 issuerPublicKeysMutex       sync.RWMutex
 }
 
 func NewDatabaseStore() *DatabaseStore {
	 return &DatabaseStore{
		 Clients:                make(map[string]fosite.Client),
		 AuthorizeCodes:         make(map[string]StoreAuthorizeCode),
		 IDSessions:             make(map[string]fosite.Requester),
		 AccessTokens:           make(map[string]fosite.Requester),
		 RefreshTokens:          make(map[string]StoreRefreshToken),
		 PKCES:                  make(map[string]fosite.Requester),
		 Users:                  make(map[string]DatabaseUserRelation),
		 AccessTokenRequestIDs:  make(map[string]string),
		 RefreshTokenRequestIDs: make(map[string]string),
		 BlacklistedJTIs:        make(map[string]time.Time),
		 IssuerPublicKeys:       make(map[string]IssuerPublicKeys),
	 }
 }
 
 type StoreAuthorizeCode struct {
	 active bool
	 fosite.Requester
 }
 
 type StoreRefreshToken struct {
	 active bool
	 fosite.Requester
 }
 
 func NewExampleStore() *DatabaseStore {
	 return &DatabaseStore{
		 IDSessions: make(map[string]fosite.Requester),
		 Clients: map[string]fosite.Client{
			 "my-client": &fosite.DefaultClient{
				 ID:             "my-client",
				 Secret:         []byte(`$2a$10$IxMdI6d.LIRZPpSfEwNoeu4rY3FhDREsxFJXikcgdRRAStxUlsuEO`),            // = "foobar"
				 RotatedSecrets: [][]byte{[]byte(`$2y$10$X51gLxUQJ.hGw1epgHTE5u0bt64xM0COU7K9iAp.OFg8p2pUd.1zC `)}, // = "foobaz",
				 RedirectURIs:   []string{"http://localhost:3846/callback"},
				 ResponseTypes:  []string{"id_token", "code", "token", "id_token token", "code id_token", "code token", "code id_token token"},
				 GrantTypes:     []string{"implicit", "refresh_token", "authorization_code", "password", "client_credentials"},
				 Scopes:         []string{"fosite", "openid", "photos", "offline"},
			 },
			 "encoded:client": &fosite.DefaultClient{
				 ID:             "encoded:client",
				 Secret:         []byte(`$2a$10$A7M8b65dSSKGHF0H2sNkn.9Z0hT8U1Nv6OWPV3teUUaczXkVkxuDS`), // = "encoded&password"
				 RotatedSecrets: nil,
				 RedirectURIs:   []string{"http://localhost:3846/callback"},
				 ResponseTypes:  []string{"id_token", "code", "token", "id_token token", "code id_token", "code token", "code id_token token"},
				 GrantTypes:     []string{"implicit", "refresh_token", "authorization_code", "password", "client_credentials"},
				 Scopes:         []string{"fosite", "openid", "photos", "offline"},
			 },
		 },
		 Users: map[string]DatabaseUserRelation{
			 "peter": {
				 // This store simply checks for equality, a real storage implementation would obviously use
				 // a hashing algorithm for encrypting the user password.
				 Username: "peter",
				 Password: "secret",
			 },
		 },
		 AuthorizeCodes:         map[string]StoreAuthorizeCode{},
		 AccessTokens:           map[string]fosite.Requester{},
		 RefreshTokens:          map[string]StoreRefreshToken{},
		 PKCES:                  map[string]fosite.Requester{},
		 AccessTokenRequestIDs:  map[string]string{},
		 RefreshTokenRequestIDs: map[string]string{},
		 IssuerPublicKeys:       map[string]IssuerPublicKeys{},
	 }
 }
 
 func (s *DatabaseStore) CreateOpenIDConnectSession(_ context.Context, authorizeCode string, requester fosite.Requester) error {
	 s.idSessionsMutex.Lock()
	 defer s.idSessionsMutex.Unlock()
 
	 s.IDSessions[authorizeCode] = requester
	 return nil
 }
 
 func (s *DatabaseStore) GetOpenIDConnectSession(_ context.Context, authorizeCode string, requester fosite.Requester) (fosite.Requester, error) {
	 s.idSessionsMutex.RLock()
	 defer s.idSessionsMutex.RUnlock()
 
	 cl, ok := s.IDSessions[authorizeCode]
	 if !ok {
		 return nil, fosite.ErrNotFound
	 }
	 return cl, nil
 }
 
 // DeleteOpenIDConnectSession is not really called from anywhere and it is deprecated.
 func (s *DatabaseStore) DeleteOpenIDConnectSession(_ context.Context, authorizeCode string) error {
	 s.idSessionsMutex.Lock()
	 defer s.idSessionsMutex.Unlock()
 
	 delete(s.IDSessions, authorizeCode)
	 return nil
 }
 
 func (s *DatabaseStore) GetClient(_ context.Context, id string) (fosite.Client, error) {
	 s.clientsMutex.RLock()
	 defer s.clientsMutex.RUnlock()
 
	 cl, ok := s.Clients[id]
	 if !ok {
		 return nil, fosite.ErrNotFound
	 }
	 return cl, nil
 }
 
 func (s *DatabaseStore) ClientAssertionJWTValid(_ context.Context, jti string) error {
	 s.blacklistedJTIsMutex.RLock()
	 defer s.blacklistedJTIsMutex.RUnlock()
 
	 if exp, exists := s.BlacklistedJTIs[jti]; exists && exp.After(time.Now()) {
		 return fosite.ErrJTIKnown
	 }
 
	 return nil
 }
 
 func (s *DatabaseStore) SetClientAssertionJWT(_ context.Context, jti string, exp time.Time) error {
	 s.blacklistedJTIsMutex.Lock()
	 defer s.blacklistedJTIsMutex.Unlock()
 
	 // delete expired jtis
	 for j, e := range s.BlacklistedJTIs {
		 if e.Before(time.Now()) {
			 delete(s.BlacklistedJTIs, j)
		 }
	 }
 
	 if _, exists := s.BlacklistedJTIs[jti]; exists {
		 return fosite.ErrJTIKnown
	 }
 
	 s.BlacklistedJTIs[jti] = exp
	 return nil
 }
 
 func (s *DatabaseStore) CreateAuthorizeCodeSession(_ context.Context, code string, req fosite.Requester) error {
	 s.authorizeCodesMutex.Lock()
	 defer s.authorizeCodesMutex.Unlock()
 
	 s.AuthorizeCodes[code] = StoreAuthorizeCode{active: true, Requester: req}
	 return nil
 }
 
 func (s *DatabaseStore) GetAuthorizeCodeSession(_ context.Context, code string, _ fosite.Session) (fosite.Requester, error) {
	 s.authorizeCodesMutex.RLock()
	 defer s.authorizeCodesMutex.RUnlock()
 
	 rel, ok := s.AuthorizeCodes[code]
	 if !ok {
		 return nil, fosite.ErrNotFound
	 }
	 if !rel.active {
		 return rel, fosite.ErrInvalidatedAuthorizeCode
	 }
 
	 return rel.Requester, nil
 }
 
 func (s *DatabaseStore) InvalidateAuthorizeCodeSession(ctx context.Context, code string) error {
	 s.authorizeCodesMutex.Lock()
	 defer s.authorizeCodesMutex.Unlock()
 
	 rel, ok := s.AuthorizeCodes[code]
	 if !ok {
		 return fosite.ErrNotFound
	 }
	 rel.active = false
	 s.AuthorizeCodes[code] = rel
	 return nil
 }
 
 func (s *DatabaseStore) CreatePKCERequestSession(_ context.Context, code string, req fosite.Requester) error {
	 s.pkcesMutex.Lock()
	 defer s.pkcesMutex.Unlock()
 
	 s.PKCES[code] = req
	 return nil
 }
 
 func (s *DatabaseStore) GetPKCERequestSession(_ context.Context, code string, _ fosite.Session) (fosite.Requester, error) {
	 s.pkcesMutex.RLock()
	 defer s.pkcesMutex.RUnlock()
 
	 rel, ok := s.PKCES[code]
	 if !ok {
		 return nil, fosite.ErrNotFound
	 }
	 return rel, nil
 }
 
 func (s *DatabaseStore) DeletePKCERequestSession(_ context.Context, code string) error {
	 s.pkcesMutex.Lock()
	 defer s.pkcesMutex.Unlock()
 
	 delete(s.PKCES, code)
	 return nil
 }
 
 func (s *DatabaseStore) CreateAccessTokenSession(_ context.Context, signature string, req fosite.Requester) error {
	 // We first lock accessTokenRequestIDsMutex and then accessTokensMutex because this is the same order
	 // locking happens in RevokeAccessToken and using the same order prevents deadlocks.
	 s.accessTokenRequestIDsMutex.Lock()
	 defer s.accessTokenRequestIDsMutex.Unlock()
	 s.accessTokensMutex.Lock()
	 defer s.accessTokensMutex.Unlock()
 
	 s.AccessTokens[signature] = req
	 s.AccessTokenRequestIDs[req.GetID()] = signature
	 return nil
 }
 
 func (s *DatabaseStore) GetAccessTokenSession(_ context.Context, signature string, _ fosite.Session) (fosite.Requester, error) {
	 s.accessTokensMutex.RLock()
	 defer s.accessTokensMutex.RUnlock()
 
	 rel, ok := s.AccessTokens[signature]
	 if !ok {
		 return nil, fosite.ErrNotFound
	 }
	 return rel, nil
 }
 
 func (s *DatabaseStore) DeleteAccessTokenSession(_ context.Context, signature string) error {
	 s.accessTokensMutex.Lock()
	 defer s.accessTokensMutex.Unlock()
 
	 delete(s.AccessTokens, signature)
	 return nil
 }
 
 func (s *DatabaseStore) CreateRefreshTokenSession(_ context.Context, signature string, req fosite.Requester) error {
	 // We first lock refreshTokenRequestIDsMutex and then refreshTokensMutex because this is the same order
	 // locking happens in RevokeRefreshToken and using the same order prevents deadlocks.
	 s.refreshTokenRequestIDsMutex.Lock()
	 defer s.refreshTokenRequestIDsMutex.Unlock()
	 s.refreshTokensMutex.Lock()
	 defer s.refreshTokensMutex.Unlock()
 
	 s.RefreshTokens[signature] = StoreRefreshToken{active: true, Requester: req}
	 s.RefreshTokenRequestIDs[req.GetID()] = signature
	 return nil
 }
 
 func (s *DatabaseStore) GetRefreshTokenSession(_ context.Context, signature string, _ fosite.Session) (fosite.Requester, error) {
	 s.refreshTokensMutex.RLock()
	 defer s.refreshTokensMutex.RUnlock()
 
	 rel, ok := s.RefreshTokens[signature]
	 if !ok {
		 return nil, fosite.ErrNotFound
	 }
	 if !rel.active {
		 return rel, fosite.ErrInactiveToken
	 }
	 return rel, nil
 }
 
 func (s *DatabaseStore) DeleteRefreshTokenSession(_ context.Context, signature string) error {
	 s.refreshTokensMutex.Lock()
	 defer s.refreshTokensMutex.Unlock()
 
	 delete(s.RefreshTokens, signature)
	 return nil
 }
 
 func (s *DatabaseStore) Authenticate(_ context.Context, name string, secret string) error {
	 s.usersMutex.RLock()
	 defer s.usersMutex.RUnlock()
 
	 rel, ok := s.Users[name]
	 if !ok {
		 return fosite.ErrNotFound
	 }
	 if rel.Password != secret {
		 return fosite.ErrNotFound.WithDebug("Invalid credentials")
	 }
	 return nil
 }
 
 func (s *DatabaseStore) RevokeRefreshToken(ctx context.Context, requestID string) error {
	 s.refreshTokenRequestIDsMutex.Lock()
	 defer s.refreshTokenRequestIDsMutex.Unlock()
 
	 if signature, exists := s.RefreshTokenRequestIDs[requestID]; exists {
		 rel, ok := s.RefreshTokens[signature]
		 if !ok {
			 return fosite.ErrNotFound
		 }
		 rel.active = false
		 s.RefreshTokens[signature] = rel
	 }
	 return nil
 }
 
 func (s *DatabaseStore) RevokeRefreshTokenMaybeGracePeriod(ctx context.Context, requestID string, signature string) error {
	 // no configuration option is available; grace period is not available with memory store
	 return s.RevokeRefreshToken(ctx, requestID)
 }
 
 func (s *DatabaseStore) RevokeAccessToken(ctx context.Context, requestID string) error {
	 s.accessTokenRequestIDsMutex.RLock()
	 defer s.accessTokenRequestIDsMutex.RUnlock()
 
	 if signature, exists := s.AccessTokenRequestIDs[requestID]; exists {
		 if err := s.DeleteAccessTokenSession(ctx, signature); err != nil {
			 return err
		 }
	 }
	 return nil
 }
 
 func (s *DatabaseStore) GetPublicKey(ctx context.Context, issuer string, subject string, keyId string) (*jose.JSONWebKey, error) {
	 s.issuerPublicKeysMutex.RLock()
	 defer s.issuerPublicKeysMutex.RUnlock()
 
	 if issuerKeys, ok := s.IssuerPublicKeys[issuer]; ok {
		 if subKeys, ok := issuerKeys.KeysBySub[subject]; ok {
			 if keyScopes, ok := subKeys.Keys[keyId]; ok {
				 return keyScopes.Key, nil
			 }
		 }
	 }
 
	 return nil, fosite.ErrNotFound
 }
 func (s *DatabaseStore) GetPublicKeys(ctx context.Context, issuer string, subject string) (*jose.JSONWebKeySet, error) {
	 s.issuerPublicKeysMutex.RLock()
	 defer s.issuerPublicKeysMutex.RUnlock()
 
	 if issuerKeys, ok := s.IssuerPublicKeys[issuer]; ok {
		 if subKeys, ok := issuerKeys.KeysBySub[subject]; ok {
			 if len(subKeys.Keys) == 0 {
				 return nil, fosite.ErrNotFound
			 }
 
			 keys := make([]jose.JSONWebKey, 0, len(subKeys.Keys))
			 for _, keyScopes := range subKeys.Keys {
				 keys = append(keys, *keyScopes.Key)
			 }
 
			 return &jose.JSONWebKeySet{Keys: keys}, nil
		 }
	 }
 
	 return nil, fosite.ErrNotFound
 }
 
 func (s *DatabaseStore) GetPublicKeyScopes(ctx context.Context, issuer string, subject string, keyId string) ([]string, error) {
	 s.issuerPublicKeysMutex.RLock()
	 defer s.issuerPublicKeysMutex.RUnlock()
 
	 if issuerKeys, ok := s.IssuerPublicKeys[issuer]; ok {
		 if subKeys, ok := issuerKeys.KeysBySub[subject]; ok {
			 if keyScopes, ok := subKeys.Keys[keyId]; ok {
				 return keyScopes.Scopes, nil
			 }
		 }
	 }
 
	 return nil, fosite.ErrNotFound
 }
 
 func (s *DatabaseStore) IsJWTUsed(ctx context.Context, jti string) (bool, error) {
	 err := s.ClientAssertionJWTValid(ctx, jti)
	 if err != nil {
		 return true, nil
	 }
 
	 return false, nil
 }
 
 func (s *DatabaseStore) MarkJWTUsedForTime(ctx context.Context, jti string, exp time.Time) error {
	 return s.SetClientAssertionJWT(ctx, jti, exp)
 }
 