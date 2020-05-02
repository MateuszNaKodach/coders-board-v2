#!/usr/bin/env bash
docker-compose -f docker-compose.local.yml up -d  --remove-orphans

npm run cross-env EVENTSOURCING_MODE=typeorm nest start --watch
