# James Brink Website
#
# VERSION    1.0.0

FROM jekyll/stable
MAINTAINER James Brink, brink.james@gmail.com
LABEL version="1.0.0"
LABEL description="James Brink's personal website"

# Install nginx for deployment
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*
RUN rm -rf /var/www/html/* 

# Copy custom nginx config files
COPY ./docker-assets/etc/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./docker-assets/etc/nginx/sites-enabled/default /etc/nginx/sites-enabled/default

# Copy site and jekyll files
COPY ./ /srv/jekyll/

# Build site and update permissions
RUN jekyll build \
  && chmod 755 /srv /srv/jekyll \
  && chown -R www-data:www-data ./_site \
  && chmod -R 755 /srv/jekyll/_site

# Expose http and https
EXPOSE 80
EXPOSE 443

CMD /usr/sbin/nginx
