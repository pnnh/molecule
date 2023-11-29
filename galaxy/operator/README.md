认证中心服务端程序

## 构建生产环境版本

```bash
GOOS=linux GOARCH=amd64 go build -o bin/galaxy-operator
```


## 构建docker镜像

```bash
sudo docker build -t galaxy-operator .
```
