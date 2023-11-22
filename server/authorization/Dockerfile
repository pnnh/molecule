
FROM golang:1.21

EXPOSE 8001

COPY build/multiverse-authorization /home

CMD ["/home/multiverse-authorization", "-config", "runtime/config.yml"]
