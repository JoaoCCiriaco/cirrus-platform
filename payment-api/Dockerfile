FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY main.go .
RUN go mod init payment-api && CGO_ENABLED=0 GOOS=linux go build -o main .

FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]
