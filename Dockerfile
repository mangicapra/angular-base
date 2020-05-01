# Alpine Linux with just Nginx
FROM nginx:alpine
LABEL author="Dragan Dejanovic"

ARG folder=/angular-seed

RUN apk --no-cache add bash

# Disable daemon mode
RUN echo "daemon off;" >> /etc/nginx/nginx.conf && \
    # Backup configs
    cp -a /etc/nginx/conf.d /etc/nginx/.conf.d.orig && \
    rm -f /etc/nginx/conf.d/default.conf && \
    # Remove default nginx website
    rm -rf /usr/share/nginx/html/* && \
    # Make sure the angular data directory is created and ownership correct
    mkdir -p $folder && \
    chown -R nginx:nginx $folder

COPY dist/angular-seed/ $folder

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/
COPY nginx/start.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/start.sh

WORKDIR /etc/nginx

CMD ["/usr/local/bin/start.sh"]

