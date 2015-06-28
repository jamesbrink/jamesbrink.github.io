James Brink Personal Website
============================

This repo is for my personal website and blog.

This is a jekyll website with a docker container that extends off of the offical jekyll container


## Development

```sh
docker run -it --rm --volume=$(pwd):/srv/jekyll -p 4000:4000 jamesbrink/website jekyll s
```

## Production

This container uses nginx for production. Build and deploy with the following.

```sh
docker build -t jamesbrink/website .
docker run -t -d -p 80:80 jamesbrink/website
```

