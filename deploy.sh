#/bin/bash

docker login
docker build . -t janrsilva/parse-sms
docker push janrsilva/parse-sms
