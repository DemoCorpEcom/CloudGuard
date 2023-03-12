FROM alpine
RUN apk add --no-cache ca-certificates
RUN apk add git nodejs npm go
RUN git clone https://github.com/DemoCorpEcom/OpenRedirectAt
WORKDIR /app
COPY . .
RUN npm install
ENTRYPOINT [ "npm","start" ]