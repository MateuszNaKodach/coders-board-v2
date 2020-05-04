#!/usr/bin/env bash
docker-compose -f docker-compose.local.yml up -d  --remove-orphans

cross-env EVENTSOURCING_MODE=typeorm nest start --debug '0.0.0.0:9229' --watch
