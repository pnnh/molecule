FROM golang:1.20-alpine as build

WORKDIR /build

# env
ENV GOPROXY https://goproxy.galaxylive.cn
ENV GOSUMDB off

# copy
ADD . ./

RUN go mod tidy && \
    go install github.com/swaggo/swag/cmd/swag@v1.8.4 && \
    swag init --exclude suites/cases,suites/stages && \
    go build  -o app

FROM alpine:3.16 as prod

RUN apk add --no-cache tzdata \
	&& cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
	&& echo "Asia/Shanghai" > /etc/timezone \
	&& apk del tzdata

WORKDIR /

COPY --from=build /build/config.yaml /config.yaml
COPY --from=build /build/data /data
COPY --from=build /build/app /

EXPOSE 80
CMD ["/app"]