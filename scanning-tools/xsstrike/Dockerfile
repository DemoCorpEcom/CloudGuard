FROM alpine
RUN apk add --no-cache ca-certificates
RUN apk add git nodejs npm python3
RUN git clone https://github.com/DemoCorpEcom/XSStrike
WORKDIR /app
COPY . .
RUN npm install
ENTRYPOINT [ "npm","start" ]