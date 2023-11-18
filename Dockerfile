# Build image
FROM node:14 AS build

# RUN apk add --no-cache python3 gcc g++ make bash --virtual .build-deps
RUN apt update
RUN apt install -y python3 gcc g++ make bash libfontconfig curl

# Build

RUN node -v
RUN npm -v

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Copy dev package.json
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/

# Install dependencies
RUN npm ci

# https://github.com/bazelbuild/rules_closure/issues/351
ENV OPENSSL_CONF=/dev/null

COPY test-phantom.js /usr/src/app/
RUN node test-phantom.js

# Copy source
COPY /src /usr/src/app/src

EXPOSE 3000

CMD [ "node", "src/main.js" ]
