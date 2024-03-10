
## 如何构建

```shell
npm run setup --workspaces
npm run build --workspaces
```
 
## 更新依赖包版本

```shell
npm update    # 更新依赖包版本
npm outdated  # 检测是否有过时的包
npm install # 安装依赖包
```

## 手动修复eslint警告

```bash
./node_modules/.bin/eslint --fix --ext .js,.jsx,.ts,.tsx .
```

## 构建docker镜像

```bash
sudo docker build -t polaris-cloud .

# 本地测试运行容器
sudo docker run --env-file debug/.env -p 8100:8100 polaris-cloud

# 镜像打标签
sudo docker tag polaris-cloud:latest elarry/polaris-cloud:v0.1.0

# 推送镜像（需要先登录）
sudo docker push elarry/polaris-cloud:v0.1.0
```