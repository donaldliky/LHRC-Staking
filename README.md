# LHRC Staking

## Run docker images locally

Note: Instructions only for MacOS.
```
cd /<pathtorepository>/lhrc_staking
```

Build and run:
```
docker compose -f docker-compose.yml up --build --remove-orphans
```

Note: Use "-d" to run containers in the background

Verify stack:
```
% docker ps
CONTAINER ID   IMAGE                             COMMAND                  CREATED          STATUS                    PORTS                  NAMES
cd2b0027f6c2   lhrc_staking_ebisusbay-frontend   "/docker-entrypoint.…"   55 seconds ago   Up 54 seconds (healthy)   0.0.0.0:8080->80/tcp   lhrc-staking
```

Delete stack:
```
docker compose down
```

### Connect to individual container via "SSH"
```
docker exec -it lhrc-staking bash
```

### Useful commands

Delete:

- all stopped containers
- all networks not used by at least one container
- all dangling images
- all dangling build cache

```
docker system prune -a
```

Delete:

- Same as above + all volumes not used by at least one container

```
docker system prune -a --volumes
```
