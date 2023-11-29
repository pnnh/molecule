认证中心服务端程序

## 构建生产环境版本

```bash
GOOS=linux GOARCH=amd64 go build -o bin/galaxy-agent
```


## 构建docker镜像

```bash
sudo docker build -t galaxy-agent .

# 本地测试运行容器
sudo docker run -p 8100:8100 harbor.galaxyteam.pro/projects/galaxy-agent:0.2.2

# 镜像打标签
sudo docker tag galaxy-agent:latest harbor.galaxyteam.pro/projects/galaxy-agent:v0.1.0
```
