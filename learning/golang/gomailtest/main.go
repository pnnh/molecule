package main

import (
	"github.com/sirupsen/logrus"
	"gopkg.in/gomail.v2"
)

func main() {
	d := gomail.NewDialer("smtp.zoho.com", 587, "a@b.xyz",
		"xxxxxx")
	//d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	mailBody := "Hello World2"

	m := gomail.NewMessage()
	// 这种方式可以添加别名，即 nickname， 也可以直接用<code>m.SetHeader("From", MAIL_USER)</code>
	nickname := "gomail"
	m.SetHeader("From",nickname + "<a@b.xyz>")
	// 发送给多个用户
	m.SetHeader("To", "a2@b.com")
	// 设置邮件主题
	m.SetHeader("Subject", "测试邮件2")
	// 设置邮件正文
	m.SetBody("text/html", mailBody)

	if err := d.DialAndSend(m); err != nil {
		logrus.Errorln("Send出错", err)
	}

	<- make(chan int)
}