FROM linuxserver/nginx
MAINTAINER henrywhitaker3@outlook.com

COPY conf/ /

RUN apk add iputils

EXPOSE 80 443

VOLUME ["/config"]
