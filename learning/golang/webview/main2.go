package main

import (
	"encoding/base64"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/url"

	"github.com/zserge/webview"
)

func callback(w webview.WebView, data string) {
	if data == "open" {
		path := w.Dialog(webview.DialogTypeOpen, 0, "Open image", "")
		if path == "" {
			return
		}
		b, err := ioutil.ReadFile(path)
		if err != nil {
			log.Fatalln(err)
		}
		err = w.Eval(fmt.Sprintf(`
			var img = document.createElement('img');
			img.src = 'data:image/png;base64,%s';
			img.style.maxWidth = '%s';
			var first = document.getElementById('gallery').firstChild;
			document.getElementById('gallery').insertBefore(img, first);
			`,
			template.JSEscapeString(base64.StdEncoding.EncodeToString(b)),
			template.JSEscapeString("100%"),
		))
		if err != nil {
			log.Fatalln(err)
		}
	}
}

const (
	preJS     = `window.console.log=function(s){external.invoke('{"type":"log","data":"'+s+'"}')};window.console.debug=function(s){external.invoke('{"type":"debug","data":"'+s+'"}')}`
	indexHTML = `<!doctype html><html><head><meta charset="utf-8"/></head><body><button onclick="external.invoke('open')">Open image</button><div id="gallery"></div></body></thml>`
)

func main2() {
	w := webview.New(webview.Settings{
		Width:                  320,
		Height:                 640,
		Title:                  "Gallery",
		URL:                    "data:text/html," + url.PathEscape(indexHTML),
		ExternalInvokeCallback: callback,
		Debug:                  true,
	})
	defer w.Exit()
	w.Dispatch(func() { w.Eval(template.JSEscapeString(preJS)) })
	w.Run()
}