FROM golang:1.20-alpine as build

WORKDIR /build

ENV GOSUMDB off

ADD . ./

RUN apk add --no-cache git

RUN go mod tidy && \
    go build -o app

FROM alpine:3.16 as prod

WORKDIR /

COPY --from=build /build/config.yml /config.yml
COPY --from=build /build/data /data
COPY --from=build /build/app /

CMD ["/app"]
