FROM alpine
RUN apk add --no-cache ca-certificates
WORKDIR /app
RUN apk add nodejs
COPY . .
RUN apk add npm
RUN npm install
ENTRYPOINT [ "npm","start" ]