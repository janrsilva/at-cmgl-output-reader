FROM node:14

COPY . /app

RUN npm install
RUN chmod +x /app/parse-sms

ENTRYPOINT [ "node", "/app/dist/index.js", "/app/sms-example.txt"]
