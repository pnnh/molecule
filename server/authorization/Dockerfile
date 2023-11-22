
FROM golang:1.21

EXPOSE 8001

WORKDIR /data

COPY build/multiverse-authorization ./

CMD ["./multiverse-authorization", "-config", "runtime/config.yml"]
