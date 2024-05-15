package ahttpmodule

import (
	"net/http"
	"strings"

	"go.elastic.co/apm"
)

type handler struct {
	handler          http.Handler
	tracer           *apm.Tracer
	panicPropagation bool
}
func ServerRequestName(req *http.Request) string {
	var b strings.Builder
	b.Grow(len(req.Method) + len(req.URL.Path) + 1)
	b.WriteString(req.Method)
	b.WriteByte(' ')
	b.WriteString(req.URL.Path)
	return b.String()
}
// ServeHTTP delegates to h.Handler, tracing the transaction with
// h.Tracer, or apm.DefaultTracer if h.Tracer is nil.
func (h *handler) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	if !h.tracer.Active() {
		h.handler.ServeHTTP(w, req)
		return
	}
	tx, req := StartTransaction(h.tracer, ServerRequestName(req), req)
	defer tx.End()

	body := h.tracer.CaptureHTTPRequestBody(req)
	w, resp := WrapResponseWriter(w)
	defer func() {
		if v := recover(); v != nil {
			if h.panicPropagation {
				defer panic(v)
				// 500 status code will be set only for APM transaction
				// to allow other middleware to choose a different response code
				if resp.StatusCode == 0 {
					resp.StatusCode = http.StatusInternalServerError
				}
			} else if resp.StatusCode == 0 {
				w.WriteHeader(http.StatusInternalServerError)
			}
		}
		body.Discard()
	}()
	h.handler.ServeHTTP(w, req)
	if resp.StatusCode == 0 {
		resp.StatusCode = http.StatusOK
	}
}





type responseWriter struct {
	http.ResponseWriter
	resp Response
}
type Response struct {
	// StatusCode records the HTTP status code set via WriteHeader.
	StatusCode int

	// Headers holds the headers set in the ResponseWriter.
	Headers http.Header
}
func WrapResponseWriter(w http.ResponseWriter) (http.ResponseWriter, *Response) {
	rw := responseWriter{
		ResponseWriter: w,
		resp: Response{
			Headers: w.Header(),
		},
	}
	return &rw, &rw.resp
}
