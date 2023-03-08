FROM alpine
RUN apk add --no-cache ca-certificates
RUN wget https://github.com/projectdiscovery/nuclei/releases/download/v2.5.5/nuclei_2.5.5_linux_amd64.zip -O nuclei.zip
WORKDIR /app
RUN apk add nodejs
COPY . .
RUN apk add npm
RUN npm install
ENTRYPOINT [ "npm","start" ]