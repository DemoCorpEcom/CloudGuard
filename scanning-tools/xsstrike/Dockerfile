FROM alpine
RUN apk add --no-cache ca-certificates
RUN apk add git nodejs npm python3 py3-pip
RUN git clone https://github.com/DemoCorpEcom/XSStrike
RUN pip3 install -r XSStrike/requirements.txt
WORKDIR /app
COPY . .
RUN npm install
ENTRYPOINT [ "npm","start" ]