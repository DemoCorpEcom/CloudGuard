FROM alpine
RUN apk add --no-cache ca-certificates
WORKDIR /app
RUN apk add nodejs npm
COPY . .
RUN npm install
ENTRYPOINT [ "npm","start" ]