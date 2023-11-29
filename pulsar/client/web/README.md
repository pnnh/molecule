## 构建生产环境版本

```bash
npm run build
```

## 构建docker镜像

```bash
sudo docker build -t pulsar-web .

# 本地测试运行容器
sudo docker run --name pulsar-web -p 6100:6100 pulsar-web
```
