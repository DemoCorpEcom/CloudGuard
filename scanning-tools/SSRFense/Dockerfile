FROM alpine
RUN apk add --no-cache ca-certificates
RUN apk add git nodejs npm python3 py3-pip
RUN pip3 install requests
WORKDIR /app
COPY . .
RUN npm install
ENTRYPOINT [ "npm","start" ]