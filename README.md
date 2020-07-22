# Uptime Tracker

[![Docker pulls](https://img.shields.io/docker/pulls/henrywhitaker3/uptime-tracker?style=flat-square)](https://hub.docker.com/r/henrywhitaker3/uptime-tracker) [![last_commit](https://img.shields.io/github/last-commit/henrywhitaker3/uptime-tracker?style=flat-square)](https://github.com/henrywhitaker3/uptime-tracker/commits) [![issues](https://img.shields.io/github/issues/henrywhitaker3/uptime-tracker?style=flat-square)](https://github.com/henrywhitaker3/uptime-tracker/issues) [![commit_freq](https://img.shields.io/github/commit-activity/m/henrywhitaker3/uptime-tracker?style=flat-square)](https://github.com/henrywhitaker3/uptime-tracker/commits) ![version](https://img.shields.io/badge/version-v1.0.0-success?style=flat-square) [![license](https://img.shields.io/github/license/henrywhitaker3/uptime-tracker?style=flat-square)](https://github.com/henrywhitaker3/uptime-tracker/blob/master/LICENSE)

This program checks your internet connection every minute to generate a graph of your uptime. This can either be done by pinging an external IP address, or by curling a [healthchecks.io](https://healthchecks.io/) endpoint.

## Features

- Backup/restore data in JSON/CSV format
- Organizr integration

## Installation & Setup

### Using Docker

A docker image is available [here](https://hub.docker.com/r/henrywhitaker3/uptime-tracker), you can create a new conatiner by running:

```bash
docker create \
      --name=uptime \
      -p 8766:80 \
      -v /path/to/data:/config \
      -e PUID=uid `#optional` \
      -e PGID=gid `#optional` \
      --restart unless-stopped \
      henrywhitaker3/uptime-tracker
```

### Using Docker Compose

```yml
    speedtest:
        container_name: uptime
        image: henrywhitaker3/uptime-tracker:dev
        ports:
            - 8766:80
        volumes:
            - /path/to/data:/config
        environment:
            - TZ=
            - PGID=
            - PUID=
            - BASE_PATH=/speedtest
        restart: unless-stopped
```

#### Parameters

Container images are configured using parameters passed at runtime (such as those above). These parameters are separated by a colon and indicate `<external>:<internal>` respectively. For example, `-p 8080:80` would expose port `80` from inside the container to be accessible from the host's IP on port `8080` outside the container.

|     Parameter             |   Function    |
|     :----:                |   --- |
|     `-p 8765:80`          |   Exposes the webserver on port 8765  |
|     `-v /config`          |   All the config files reside here.   |
|     `-e PUID`             |   Optional. Supply a local user ID for volume permissions   |
|     `-e PGID`             |   Optional. Supply a local group ID for volume permissions  |
