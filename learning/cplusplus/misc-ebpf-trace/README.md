学习ebpf的简单使用

docker目录为开发所需要的环境，采用Docker管理。

开发工具为CLion，需要设置Docker SSH工具链。

构建docker镜像

```bash
cd docker
docker build -t ebpf-trace-dev:1.0 -f ./Dockerfile.devenv .
docker run -d -p 2022:22 ebpf-trace-dev:1.0 
```


