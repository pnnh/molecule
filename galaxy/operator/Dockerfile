FROM golang:1.21

EXPOSE 8401

WORKDIR /data

COPY build/galaxy-operator ./

CMD ["./galaxy-operator", "-config", "runtime/config.yml"]
