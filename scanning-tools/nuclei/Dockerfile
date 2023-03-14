FROM alpine
RUN apk add --no-cache ca-certificates
RUN wget https://github.com/projectdiscovery/nuclei/releases/download/v2.5.5/nuclei_2.5.5_linux_amd64.zip -O nuclei.zip
WORKDIR /app
RUN unzip /nuclei.zip 
RUN apk add nodejs npm
COPY . .
RUN npm install
ENTRYPOINT [ "npm","start" ]